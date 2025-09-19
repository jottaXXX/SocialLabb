import requests
import sys
import json
from datetime import datetime

class SocialLabAPITester:
    def __init__(self, base_url="https://sociallab-marketing.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.created_lead_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            print(f"   Status Code: {response.status_code}")
            
            # Try to parse JSON response
            try:
                response_data = response.json()
                print(f"   Response: {json.dumps(response_data, indent=2)}")
            except:
                print(f"   Response Text: {response.text[:200]}...")

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED - {name}")
            else:
                print(f"❌ FAILED - {name} - Expected {expected_status}, got {response.status_code}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except requests.exceptions.RequestException as e:
            print(f"❌ FAILED - {name} - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ FAILED - {name} - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        if success and isinstance(response, dict):
            expected_message = "SocialLab API - Transformando sua presença digital"
            if response.get('message') == expected_message:
                print(f"✅ Root endpoint message is correct")
                return True
            else:
                print(f"❌ Root endpoint message mismatch. Expected: '{expected_message}', Got: '{response.get('message')}'")
        return success

    def test_create_lead_valid(self):
        """Test POST /api/leads with valid data"""
        test_data = {
            "nome": "João Teste",
            "email": "joao@teste.com",
            "mensagem": "Mensagem de teste para SocialLab"
        }
        
        success, response = self.run_test(
            "Create Lead - Valid Data",
            "POST",
            "leads",
            200,
            data=test_data
        )
        
        if success and isinstance(response, dict):
            if (response.get('success') == True and 
                response.get('message') == "Mensagem enviada com sucesso!" and
                response.get('lead_id')):
                self.created_lead_id = response.get('lead_id')
                print(f"✅ Lead created successfully with ID: {self.created_lead_id}")
                return True
            else:
                print(f"❌ Invalid response format or content")
        return success

    def test_create_lead_invalid_email(self):
        """Test POST /api/leads with invalid email"""
        test_data = {
            "nome": "Teste Invalid",
            "email": "invalid-email",
            "mensagem": "Teste com email inválido"
        }
        
        success, response = self.run_test(
            "Create Lead - Invalid Email",
            "POST",
            "leads",
            422,  # Validation error expected
            data=test_data
        )
        return True  # We expect this to fail with 422, so if we get 422, it's correct

    def test_create_lead_missing_fields(self):
        """Test POST /api/leads with missing required fields"""
        test_data = {
            "nome": "Teste Incomplete"
            # Missing email and mensagem
        }
        
        success, response = self.run_test(
            "Create Lead - Missing Fields",
            "POST",
            "leads",
            422,  # Validation error expected
            data=test_data
        )
        return True  # We expect this to fail with 422

    def test_get_leads(self):
        """Test GET /api/leads endpoint"""
        success, response = self.run_test(
            "Get All Leads",
            "GET",
            "leads",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} leads from database")
            
            # Check if our created lead is in the list
            if self.created_lead_id:
                found_lead = None
                for lead in response:
                    if lead.get('id') == self.created_lead_id:
                        found_lead = lead
                        break
                
                if found_lead:
                    print(f"✅ Created lead found in database: {found_lead.get('nome')} - {found_lead.get('email')}")
                    return True
                else:
                    print(f"❌ Created lead with ID {self.created_lead_id} not found in database")
            return success
        else:
            print(f"❌ Expected list response, got: {type(response)}")
        return False

    def test_create_lead_empty_strings(self):
        """Test POST /api/leads with empty strings"""
        test_data = {
            "nome": "",
            "email": "test@test.com",
            "mensagem": ""
        }
        
        success, response = self.run_test(
            "Create Lead - Empty Strings",
            "POST",
            "leads",
            422,  # Should fail validation
            data=test_data
        )
        return True  # We expect this to fail

    def print_summary(self):
        """Print test summary"""
        print(f"\n" + "="*60)
        print(f"📊 SOCIALLAB API TEST SUMMARY")
        print(f"="*60)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print(f"🎉 ALL TESTS PASSED! API is working correctly.")
            return 0
        else:
            print(f"⚠️  Some tests failed. Please check the API implementation.")
            return 1

def main():
    print("🚀 Starting SocialLab API Tests...")
    print(f"Testing against: https://sociallab-marketing.preview.emergentagent.com/api")
    
    tester = SocialLabAPITester()
    
    # Run all tests
    print("\n" + "="*60)
    print("RUNNING BACKEND API TESTS")
    print("="*60)
    
    # Test 1: Root endpoint
    tester.test_root_endpoint()
    
    # Test 2: Create lead with valid data
    tester.test_create_lead_valid()
    
    # Test 3: Get all leads
    tester.test_get_leads()
    
    # Test 4: Create lead with invalid email
    tester.test_create_lead_invalid_email()
    
    # Test 5: Create lead with missing fields
    tester.test_create_lead_missing_fields()
    
    # Test 6: Create lead with empty strings
    tester.test_create_lead_empty_strings()
    
    # Print final summary
    return tester.print_summary()

if __name__ == "__main__":
    sys.exit(main())