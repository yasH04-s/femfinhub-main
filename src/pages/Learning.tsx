import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Play, Book, Award, Clock, Star, Users, Calendar, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

const Learning = () => {
  const { toast } = useToast();
  const [mentors, setMentors] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [bookingSlot, setBookingSlot] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [activeQuizCourse, setActiveQuizCourse] = useState<any>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await fetch('/api/mentorship/mentors');
      const data = await res.json();
      if (data.success) {
        setMentors(data.mentors);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookMentor = async () => {
    if (!selectedMentor || !bookingSlot) return;
    try {
      const res = await fetch('/api/mentorship/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorId: selectedMentor.id,
          slot: bookingSlot,
          userNotes,
          userName: 'Priya Sharma'
        })
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Mentorship Session Confirmed! 📅",
          description: `Booked with ${data.booking.mentorName} for ${data.booking.slot}. Calendar invite sent!`,
        });
        setSelectedMentor(null);
        setBookingSlot('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const courses = [
    {
      id: 1,
      title: 'No-Collateral Business Microfinance 101',
      description: 'Master cashflow management, Mudra loan applications, and bias-free credit scoring.',
      progress: 85,
      category: 'Beginner',
      duration: '3 hours',
      rating: 4.9,
      enrolled: 3420,
    },
    {
      id: 2,
      title: 'Digital Transactions & Inventory Scaling',
      description: "Optimizing UPI sales velocity and inventory turnover to boost business credit score.",
      progress: 40,
      category: 'Intermediate',
      duration: '4 hours',
      rating: 4.8,
      enrolled: 2180,
    },
    {
      id: 3,
      title: 'Self-Help Group (SHG) Micro-Lending Circles',
      description: 'Build community peer-trust networks and unlock revolving micro-grants.',
      progress: 100,
      category: 'Beginner',
      duration: '2 hours',
      rating: 4.95,
      enrolled: 4120,
    }
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white p-6 md:p-8 rounded-2xl shadow-xl">
        <div className="max-w-3xl space-y-3">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> FemFin Literacy & Leadership Academy
          </Badge>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Learning Courses & 1-on-1 Mentorship Hub
          </h1>
          <p className="text-emerald-100/80 text-sm md:text-base">
            Gain practical financial skills and connect 1-on-1 with female venture leaders, CFOs, and micro-loan strategists.
          </p>
        </div>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 mb-6">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <Book className="w-4 h-4" /> Financial Courses & Quizzes
          </TabsTrigger>
          <TabsTrigger value="mentors" className="flex items-center gap-2">
            <Users className="w-4 h-4" /> 1-on-1 Female Mentors & Advisors
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Courses */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col justify-between border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      {course.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground font-semibold">
                      <Star className="h-3.5 w-3.5 mr-1 text-yellow-500 fill-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold">{course.title}</CardTitle>
                  <CardDescription className="text-xs">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{course.progress === 100 ? 'Completed' : 'In Progress'}</span>
                    <span className="font-bold text-emerald-600">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 bg-slate-100 dark:bg-slate-800" />
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {course.duration}</span>
                    <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1" /> {course.enrolled}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveQuizCourse(course)}>
                        <Award className="w-4 h-4 mr-1.5 text-emerald-600" /> Take Quiz & Get Badge
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Quiz: {course.title}</DialogTitle>
                        <DialogDescription>Test your financial literacy score to boost your credit readiness.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-3 text-sm">
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg space-y-2">
                          <p className="font-semibold">Q1: Which factor weighs heaviest in FemFin's bias-free AI credit score?</p>
                          <div className="space-y-1 text-xs">
                            <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                              <input type="radio" name="q1" defaultChecked /> Monthly net cashflow & profit margin
                            </label>
                            <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                              <input type="radio" name="q1" /> Male co-signer income
                            </label>
                            <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                              <input type="radio" name="q1" /> Property land ownership
                            </label>
                          </div>
                        </div>

                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => {
                          setQuizScore(100);
                          toast({ title: "Quiz Passed! 🏆", description: "Earned Certificate Badge: Microfinance Specialist" });
                        }}>
                          Submit Quiz Answers
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border-emerald-500/20">
            <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600 rounded-full text-white">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">FemFin Verified Certificate Track</h3>
                  <p className="text-xs text-muted-foreground">Complete 3 modules to receive an automated verification badge attached to your loan profile.</p>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Download Verified Certificate (PDF)</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Mentors */}
        <TabsContent value="mentors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <CardHeader className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-2 border-2 border-emerald-500">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback className="bg-emerald-600 text-white font-bold">{mentor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg font-bold">{mentor.name}</CardTitle>
                  <CardDescription className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {mentor.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-xs text-muted-foreground text-center line-clamp-3">{mentor.bio}</p>
                  
                  <div className="flex justify-between items-center text-xs p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <span>Specialization:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{mentor.specialization}</span>
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>⭐ {mentor.rating} ({mentor.sessionsCompleted} Sessions)</span>
                    <span>📍 {mentor.location}</span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => setSelectedMentor(mentor)}>
                        <Calendar className="w-4 h-4 mr-2" /> Book 1-on-1 Consultation
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book Session with {selectedMentor?.name}</DialogTitle>
                        <DialogDescription>{selectedMentor?.specialization}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-2 text-sm">
                        <div className="space-y-2">
                          <label className="font-semibold text-xs">Select Available Time Slot:</label>
                          <div className="grid grid-cols-1 gap-2">
                            {selectedMentor?.availableSlots?.map((slot: string, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setBookingSlot(slot)}
                                className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${
                                  bookingSlot === slot
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                                }`}
                              >
                                📅 {slot}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-semibold text-xs">Session Agenda / Questions:</label>
                          <Textarea
                            placeholder="What specific guidance or loan support do you need?"
                            value={userNotes}
                            onChange={(e) => setUserNotes(e.target.value)}
                            className="text-xs"
                          />
                        </div>

                        <Button
                          disabled={!bookingSlot}
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                          onClick={handleBookMentor}
                        >
                          Confirm & Send Meeting Link
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Learning;
