import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { 
  Globe, 
  Users, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  Menu, 
  X, 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle,
  Target,
  Zap
} from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sobre Nós", path: "/sobre" },
    { name: "Serviços", path: "/servicos" },
    { name: "Contato", path: "/contato" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            SocialLab
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${
                  location.pathname === link.path ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Home Page
const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transforme sua 
                <span className="text-blue-600"> presença digital</span> 
                com a SocialLab
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Landing pages otimizadas e gestão de social media para crescer seu negócio
              </p>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Solicite sua avaliação gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="lg:order-first">
              <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <div className="bg-blue-100 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-blue-600 font-semibold">Imagem: Equipe trabalhando em marketing digital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções completas para transformar sua presença digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-0">
                <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Criação de Landing Pages
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Desenvolvemos páginas de alta conversão, com design profissional e focadas em captar leads.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-0">
                <div className="bg-purple-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Gestão de Social Media
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Gerenciamos suas redes sociais, criando conteúdo relevante e aumentando engajamento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center bg-white shadow-lg">
              <CardContent className="p-0">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-600 italic mb-6">
                  "A SocialLab transformou nossas campanhas e aumentou nosso engajamento em 50%!"
                </blockquote>
                <cite className="text-gray-900 font-semibold">
                  Cliente Satisfeito
                </cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Quer transformar sua presença digital?
          </h2>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full border-0 shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.location.href = '/contato'}
          >
            Fale com a SocialLab
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

// About Page
const About = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Conheça nossa equipe
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profissionais apaixonados por transformar negócios através do marketing digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="p-8 text-center bg-white shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-0">
                <div className="bg-blue-100 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <p className="text-blue-600 font-semibold text-sm">Foto do CEO</p>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  João Silva
                </h3>
                <p className="text-blue-600 font-semibold mb-4">
                  CEO & Estrategista Digital
                </p>
                <p className="text-gray-600">
                  Especialista em estratégias digitais com mais de 10 anos de experiência.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center bg-white shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-0">
                <div className="bg-purple-100 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <p className="text-purple-600 font-semibold text-sm">Foto da Designer</p>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Maria Costa
                </h3>
                <p className="text-purple-600 font-semibold mb-4">
                  Designer de Landing Pages
                </p>
                <p className="text-gray-600">
                  Criativa e focada em resultados, especializada em páginas de alta conversão.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

// Services Page
const Services = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Nossos Serviços
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluções personalizadas para cada necessidade do seu negócio
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-10 bg-white shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-0">
                <div className="bg-blue-600 w-20 h-20 rounded-lg flex items-center justify-center mb-8">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Landing Pages
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Criação de páginas modernas, responsivas e otimizadas para conversão.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">Design responsivo e moderno</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">Otimização para SEO</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">Alta taxa de conversão</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-10 bg-white shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-0">
                <div className="bg-purple-600 w-20 h-20 rounded-lg flex items-center justify-center mb-8">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Social Media
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Gestão completa de redes sociais, incluindo criação de conteúdo, planejamento estratégico e análise de métricas.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Target className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">Estratégia personalizada</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">Conteúdo engajador</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">Análise de resultados</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Page
const Contact = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/leads`, formData);
      
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ nome: '', email: '', mensagem: '' });
      } else {
        toast.error('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pronto para transformar sua presença digital? Vamos conversar!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 bg-white shadow-xl">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Envie sua mensagem
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome *
                    </label>
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      required
                      value={formData.mensagem}
                      onChange={handleChange}
                      className="w-full min-h-32"
                      placeholder="Conte-nos sobre seu projeto..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="p-8 bg-white shadow-xl">
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Informações de Contato
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <Mail className="h-6 w-6 text-blue-600 mr-4" />
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <p className="text-gray-600">contato@sociallab.com</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="h-6 w-6 text-blue-600 mr-4" />
                      <div>
                        <p className="font-semibold text-gray-900">Telefone</p>
                        <p className="text-gray-600">+55 11 99999-9999</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                      <div>
                        <p className="font-semibold text-gray-900">Endereço</p>
                        <p className="text-gray-600">Rua Exemplo, 123 - São Paulo, SP</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 bg-blue-600 text-white shadow-xl">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold mb-4">
                    Pronto para começar?
                  </h3>
                  <p className="mb-4">
                    Entre em contato conosco e transforme sua presença digital hoje mesmo!
                  </p>
                  <Button 
                    variant="outline" 
                    className="bg-white text-blue-600 hover:bg-gray-100 border-0"
                  >
                    Solicitar Orçamento
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">SocialLab</h3>
          <p className="text-gray-400 mb-6">
            Transformando sua presença digital
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 SocialLab. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;