
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, LifeBuoy, Book, FileText, MessageCircle, Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I create a budget in FemFinHub?",
      answer: "Navigate to the Dashboard and click on 'Create Budget'. Follow the guided steps to set up income sources, expense categories, and savings goals. You can also use our templates for common budget scenarios.",
      category: "Getting Started"
    },
    {
      question: "Can I link my bank accounts to track expenses automatically?",
      answer: "Yes! Go to Settings > Linked Accounts and follow the secure connection process. We use bank-level encryption to ensure your data remains safe and private.",
      category: "Account Management"
    },
    {
      question: "How do I set up automatic savings?",
      answer: "In the Expenses section, click on 'Savings Rules'. You can create rules like saving a percentage of income or rounding up transactions to the nearest dollar.",
      category: "Savings"
    },
    {
      question: "Is my financial data secure?",
      answer: "Absolutely. We use 256-bit encryption, multi-factor authentication, and never sell your data to third parties. Read our Privacy Policy for more details.",
      category: "Security"
    },
    {
      question: "How do I connect with a financial advisor?",
      answer: "Visit the Community section and navigate to the Mentors tab. You can browse profiles of certified advisors and book a session directly through the platform.",
      category: "Support"
    },
  ];

  const tutorials = [
    {
      title: "Getting Started with FemFinHub",
      description: "A comprehensive guide to setting up your account and making the most of the platform.",
      duration: "5 min read",
      category: "Beginner"
    },
    {
      title: "Creating Your First Budget",
      description: "Learn how to set up a budget that works for your financial situation.",
      duration: "8 min read",
      category: "Beginner"
    },
    {
      title: "Advanced Investment Tracking",
      description: "How to monitor your investments and analyze performance metrics.",
      duration: "12 min read",
      category: "Advanced"
    },
    {
      title: "Setting Effective Financial Goals",
      description: "Strategies for creating achievable and meaningful financial goals.",
      duration: "6 min read",
      category: "Intermediate"
    },
  ];

  const supportTeam = [
    {
      name: "Sarah Johnson",
      role: "Financial Coach",
      avatar: "/placeholder.svg",
      available: true
    },
    {
      name: "Michael Chen",
      role: "Technical Support",
      avatar: "/placeholder.svg",
      available: false
    },
    {
      name: "Aisha Patel",
      role: "Account Specialist",
      avatar: "/placeholder.svg",
      available: true
    },
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Find answers, tutorials, and support for all your FemFinHub questions.</p>
      </div>

      <div className="mb-8 relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search for help articles, FAQs, and more..." 
          className="pl-10 h-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <LifeBuoy className="h-5 w-5 text-primary mb-2" />
            <CardTitle>Help Center</CardTitle>
            <CardDescription>Browse our knowledge base</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Visit Help Center
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <Book className="h-5 w-5 text-primary mb-2" />
            <CardTitle>Tutorials</CardTitle>
            <CardDescription>Step-by-step guides</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Browse Tutorials
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <MessageCircle className="h-5 w-5 text-primary mb-2" />
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Talk to our support team</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Start Chat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="faq">
            <FileText className="mr-2 h-4 w-4" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <Book className="mr-2 h-4 w-4" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="mr-2 h-4 w-4" />
            Contact Us
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <span>{faq.question}</span>
                          <Badge variant="outline" className="ml-2">{faq.category}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No FAQs match your search query.</p>
                  <Button variant="link" onClick={() => setSearchQuery('')}>Clear search</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tutorials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge variant={
                      tutorial.category === "Beginner" ? "default" : 
                      tutorial.category === "Intermediate" ? "secondary" : 
                      "destructive"
                    }>
                      {tutorial.category}
                    </Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Read Tutorial</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Our support team will get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full min-h-[120px] rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Describe your issue or question in detail..."
                  ></textarea>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Message</Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>support@femfinhub.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>1-800-FEM-HELP</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Team</CardTitle>
                  <CardDescription>Available team members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supportTeam.map((member, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      {member.available ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                          Offline
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
