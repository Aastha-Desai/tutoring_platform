import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Library, Users } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: BookOpen,
      title: 'Personalized Tutoring',
      description: 'Get expert guidance tailored to your learning needs.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Track your learning milestones and achievements easily.',
    },
    {
      icon: Library,
      title: 'Resource Library',
      description: 'Study with high-quality notes, videos, and learning material.',
    },
    {
      icon: Users,
      title: 'Community & Support',
      description: 'Engage with fellow learners and find answers to your doubts.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Everything you need to succeed in your studies</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <service.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;