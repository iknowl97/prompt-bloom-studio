import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Code, Library, ChevronRight, Zap, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

const testimonials = [
  {
    id: 1,
    quote: "Prompt Bloom has completely transformed how I create and manage my AI prompts. The visualization tools are incredible!",
    author: "Alex Johnson",
    role: "AI Researcher",
    avatar: "https://i.pravatar.cc/150?img=33"
  },
  {
    id: 2,
    quote: "As someone new to prompt engineering, the learning modules were exactly what I needed to get started on the right foot.",
    author: "Maria Garcia",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/150?img=42"
  },
  {
    id: 3,
    quote: "The template library saved me countless hours. The quality of templates is outstanding and the AI suggestions are spot on.",
    author: "Raj Patel",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/150?img=59"
  }
];

const features = [
  {
    id: 1,
    title: "Visual Prompt Builder",
    description: "Create complex prompts with our intuitive block-based interface",
    icon: <Code className="h-8 w-8 text-primary-500" />,
    path: "/prompt-builder"
  },
  {
    id: 2,
    title: "Template Library",
    description: "Access hundreds of proven templates for various AI tasks",
    icon: <Library className="h-8 w-8 text-secondary-500" />,
    path: "/templates"
  },
  {
    id: 3,
    title: "Learning Center",
    description: "Master prompt engineering through guided interactive lessons",
    icon: <BookOpen className="h-8 w-8 text-accent-500" />,
    path: "/learn"
  }
];

const HomePage = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23FFFFFF" fill-opacity="0.8" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '30px 30px' }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Master the Art of AI Prompt Engineering
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-lg">
                  Create, optimize, and manage your AI prompts with our comprehensive platform. Designed for both beginners and experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="accent"
                    size="lg"
                    rightIcon={<ChevronRight />}
                    className="font-medium"
                    onClick={() => window.location.href = '/prompt-builder'}
                  >
                    Start Building
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:bg-opacity-10"
                    onClick={() => window.location.href = '/learn'}
                  >
                    Explore Learning Center
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-20 p-4 shadow-lg"
              >
                <img 
                  src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Prompt Builder Interface" 
                  className="rounded-lg w-full shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Tools for Every Prompt Engineer
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                From beginners to experts, our comprehensive toolkit helps you craft the perfect prompts for any AI system.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={feature.path}>
                      <Button variant="outline" size="sm" rightIcon={<ChevronRight size={16} />}>
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <img 
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="AI Prompt Engineering" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Prompt Bloom?
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="rounded-full bg-primary-100 p-2">
                      <Zap className="h-5 w-5 text-primary-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Boost Productivity</h3>
                    <p className="text-text-secondary">
                      Create effective prompts in minutes, not hours, with our intuitive interface and AI assistance.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="rounded-full bg-secondary-100 p-2">
                      <Sparkles className="h-5 w-5 text-secondary-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Improve Quality</h3>
                    <p className="text-text-secondary">
                      Learn best practices and techniques to generate better results from AI models.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="rounded-full bg-accent-100 p-2">
                      <Library className="h-5 w-5 text-accent-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Access Templates</h3>
                    <p className="text-text-secondary">
                      Use our extensive library of proven prompt templates for various AI tasks.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="rounded-full bg-info-100 p-2">
                      <Clock className="h-5 w-5 text-info-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Save Time</h3>
                    <p className="text-text-secondary">
                      Stop spending hours on trial and error. Use proven techniques from day one.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ChevronRight size={16} />}
                  onClick={() => window.location.href = '/prompt-builder'}
                >
                  Get Started Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Join thousands of users who are already creating better AI prompts with Prompt Bloom.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="h-px bg-gray-200 flex-grow"></div>
                      <div className="px-2 text-2xl text-gray-400">"</div>
                      <div className="h-px bg-gray-200 flex-grow"></div>
                    </div>
                    <p className="text-text-secondary mb-6 italic">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-medium">{testimonial.author}</div>
                        <div className="text-sm text-text-secondary">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Master Prompt Engineering?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Start creating better AI prompts today with our comprehensive platform.
            </p>
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ChevronRight />}
              className="font-medium"
              onClick={() => window.location.href = '/prompt-builder'}
            >
              Get Started for Free
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;