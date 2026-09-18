import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Search, MessageSquare, Users, ThumbsUp, Sparkles, HeartHandshake, ShieldCheck, ArrowRight, Share2 } from 'lucide-react';

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [circles, setCircles] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // New post modal state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Funding & Loans');
  const [newContent, setNewContent] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchCircles();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      const url = selectedCategory !== 'All' ? `/api/community/posts?category=${selectedCategory}` : '/api/community/posts';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCircles = async () => {
    try {
      const res = await fetch('/api/community/circles');
      const data = await res.json();
      if (data.success) {
        setCircles(data.circles);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpvote = async (postId: string) => {
    try {
      const res = await fetch(`/api/community/posts/${postId}/upvote`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, upvotes: data.upvotes } : p));
        toast({ title: "Upvoted! 👍", description: "Your vote was added to the community thread." });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreatePost = async () => {
    if (!newTitle || !newContent) return;
    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          content: newContent,
          authorName: 'Priya Sharma',
          authorRole: 'FemFin Member (Artisan Crafts)'
        })
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Post Published! 🎉", description: "Your discussion thread is live." });
        setModalOpen(false);
        setNewTitle('');
        setNewContent('');
        fetchPosts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 text-white p-6 md:p-8 rounded-2xl shadow-xl">
        <div className="max-w-3xl space-y-3">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
            <Users className="w-3.5 h-3.5 mr-1" /> Women Entrepreneur Network & SHG Alliance
          </Badge>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            FemFin Community Forums & Peer Micro-Lending
          </h1>
          <p className="text-emerald-100/80 text-sm md:text-base">
            Share loan success stories, discuss tax compliance, collaborate on bulk inventory orders, and join peer micro-lending circles.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
              <MessageSquare className="mr-2 h-4 w-4" /> Start Discussion Thread
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Community Thread</DialogTitle>
              <DialogDescription>Ask questions or share financial tips with 14,000+ female business owners.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2 text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-xs">Topic Title:</label>
                <Input placeholder="e.g. How to get Mudra loan approved fast" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-xs">Category:</label>
                <select 
                  className="w-full p-2 border rounded-md text-xs bg-background"
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="Funding & Loans">Funding & Loans</option>
                  <option value="Peer Micro-Lending">Peer Micro-Lending</option>
                  <option value="Legal & Tax">Legal & Tax</option>
                  <option value="Marketing & Growth">Marketing & Growth</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-xs">Discussion Details:</label>
                <Textarea placeholder="Share details..." value={newContent} onChange={(e) => setNewContent(e.target.value)} className="min-h-[100px]" />
              </div>
              <Button onClick={handleCreatePost} className="w-full bg-emerald-600 hover:bg-emerald-700">Publish Thread</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 mb-6">
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Forum Threads
          </TabsTrigger>
          <TabsTrigger value="circles" className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4" /> Peer Micro-Lending SHG Circles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-emerald-500">
                        <AvatarImage src={post.avatar} alt={post.authorName} />
                        <AvatarFallback className="bg-emerald-600 text-white font-bold">{post.authorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">{post.authorName}</h4>
                        <span className="text-xs text-emerald-600 font-medium">{post.authorRole}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
                      {post.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{post.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{post.content}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags?.map((tag: string) => (
                      <Badge key={tag} className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px]">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => handleUpvote(post.id)} className="gap-1 text-emerald-600 hover:text-emerald-700">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="font-bold">{post.upvotes} Upvotes</span>
                    </Button>
                    <span className="flex items-center gap-1">💬 {post.commentsCount} Comments</span>
                  </div>
                  <span>{post.createdAt}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="circles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {circles.map((c) => (
              <Card key={c.id} className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex justify-between items-start mb-1">
                    <Badge className="bg-emerald-600 text-white">{c.repaymentRate}</Badge>
                    <span className="text-xs font-semibold text-emerald-600">{c.monthlyContribution}</span>
                  </div>
                  <CardTitle className="text-xl font-bold">{c.name}</CardTitle>
                  <CardDescription>Current Pool Size: {c.totalPool} ({c.membersCount} Members)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-500/20 text-xs space-y-1">
                    <p className="font-bold text-emerald-800 dark:text-emerald-300">Active Milestone Beneficiary:</p>
                    <p className="text-slate-700 dark:text-slate-300">{c.currentBeneficiary}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Next Revolving Payout Cycle: {c.nextCycleDate}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => toast({ title: "Joined SHG Circle! 🤝", description: "You are queued for the next revolving fund cycle." })}>
                    Request Join SHG Circle <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
