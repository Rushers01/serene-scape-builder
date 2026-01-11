import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Clock,
  Star,
  Filter,
  PenSquare,
  X,
  ThumbsUp,
  Sparkles,
  Users,
  Award,
} from "lucide-react";

interface Post {
  id: number;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Sarah M.",
    avatar: "SM",
    title: "How meditation changed my life after years of anxiety",
    content: "I struggled with anxiety for 8 years. Constant worry, panic attacks, sleepless nights. When I first heard about meditation, I was skeptical. But after 6 months of consistent practice using MindEase, I can finally say I feel like myself again. The breathing exercises and guided sessions helped me understand my triggers and develop coping mechanisms. If you're just starting out, be patient with yourself. It takes time, but it's worth it. 💚",
    category: "Recovery Story",
    likes: 234,
    comments: 45,
    timeAgo: "2 hours ago",
    isLiked: false,
    isBookmarked: false,
    tags: ["anxiety", "meditation", "recovery"],
  },
  {
    id: 2,
    author: "James K.",
    avatar: "JK",
    title: "Tips that helped me overcome depression - sharing what worked",
    content: "After battling depression for 3 years, I want to share what actually helped me: 1) Morning walks, even just 10 minutes 2) Journaling before bed 3) The mood tracking feature here - seeing patterns helped my therapist a lot 4) Connecting with this community 5) Being honest with myself about needing professional help. Remember, everyone's journey is different. What works for me might not work for you, and that's okay.",
    category: "Tips & Advice",
    likes: 456,
    comments: 89,
    timeAgo: "5 hours ago",
    isLiked: true,
    isBookmarked: true,
    tags: ["depression", "tips", "therapy"],
  },
  {
    id: 3,
    author: "Priya R.",
    avatar: "PR",
    title: "First time posting - feeling hopeful after the assessment",
    content: "Hi everyone! I've been lurking here for weeks and finally decided to post. I just took the mental health assessment and while my results showed moderate concern, the suggestions were so helpful. I've already booked an appointment with a therapist. Reading all your stories gives me hope that things can get better. Thank you all for being so open about your journeys. 🙏",
    category: "New Member",
    likes: 189,
    comments: 67,
    timeAgo: "8 hours ago",
    isLiked: false,
    isBookmarked: false,
    tags: ["newmember", "hope", "firstpost"],
  },
  {
    id: 4,
    author: "Michael T.",
    avatar: "MT",
    title: "1 year mental health journey - before and after",
    content: "One year ago, I couldn't get out of bed. Today, I ran my first 5K. This community, along with professional help and consistent use of the exercises here, saved my life. To anyone reading this who's struggling: you are stronger than you know. Take it one day at a time. Celebrate small wins. And never be ashamed to ask for help. I'm living proof that it gets better. ❤️",
    category: "Milestone",
    likes: 892,
    comments: 156,
    timeAgo: "1 day ago",
    isLiked: true,
    isBookmarked: false,
    tags: ["milestone", "recovery", "inspiration"],
  },
  {
    id: 5,
    author: "Emma L.",
    avatar: "EL",
    title: "The 5-4-3-2-1 grounding technique - my experience",
    content: "I wanted to share how the 5-4-3-2-1 grounding exercise in the app has been a game changer for my panic attacks. Before, I'd spiral for hours. Now, when I feel one coming, I immediately start the exercise. 5 things I can see, 4 I can touch... By the time I'm done, my heart rate is back to normal. It's not magic, but it gives my brain something else to focus on. Has anyone else tried this?",
    category: "Tips & Advice",
    likes: 345,
    comments: 78,
    timeAgo: "2 days ago",
    isLiked: false,
    isBookmarked: true,
    tags: ["grounding", "anxiety", "exercises"],
  },
];

const categories = ["All", "Recovery Story", "Tips & Advice", "New Member", "Milestone", "Question"];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"trending" | "recent" | "top">("trending");
  const [isWriting, setIsWriting] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "Tips & Advice" });

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleSubmitPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post: Post = {
        id: Date.now(),
        author: "You",
        avatar: "YO",
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        likes: 0,
        comments: 0,
        timeAgo: "Just now",
        isLiked: false,
        isBookmarked: false,
        tags: [],
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "", category: "Tips & Advice" });
      setIsWriting(false);
    }
  };

  const filteredPosts = posts.filter(post => filter === "All" || post.category === filter);

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "trending") return b.likes + b.comments - (a.likes + a.comments);
    if (sortBy === "top") return b.likes - a.likes;
    return 0; // recent - already sorted by time
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nature-light border border-nature/20 mb-4">
              <Users className="w-4 h-4 text-nature" />
              <span className="text-sm font-medium text-nature">Community</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Share Your Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A safe space to share experiences, find support, and inspire others on their mental wellness journey.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { icon: Users, label: "Members", value: "12.5K+" },
              { icon: MessageCircle, label: "Stories Shared", value: "3.2K+" },
              { icon: Heart, label: "Hearts Given", value: "89K+" },
              { icon: Award, label: "Lives Touched", value: "∞" },
            ].map((stat, idx) => (
              <Card key={idx} className="p-4 text-center border-0 shadow-soft">
                <stat.icon className="w-6 h-6 text-calm mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      filter === cat
                        ? "bg-calm text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <Button variant="calm" onClick={() => setIsWriting(true)}>
                <PenSquare className="w-4 h-4 mr-2" />
                Share Your Story
              </Button>
            </div>

            {/* Sort Options */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSortBy("trending")}
                className={`flex items-center gap-1 text-sm ${sortBy === "trending" ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                <TrendingUp className="w-4 h-4" />
                Trending
              </button>
              <button
                onClick={() => setSortBy("recent")}
                className={`flex items-center gap-1 text-sm ${sortBy === "recent" ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                <Clock className="w-4 h-4" />
                Recent
              </button>
              <button
                onClick={() => setSortBy("top")}
                className={`flex items-center gap-1 text-sm ${sortBy === "top" ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                <Star className="w-4 h-4" />
                Top
              </button>
            </div>

            {/* Write Post Modal */}
            {isWriting && (
              <Card className="p-6 mb-6 border-2 border-calm/30 shadow-medium animate-scale-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif text-xl font-semibold text-foreground">Share Your Story</h3>
                  <button onClick={() => setIsWriting(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Input
                  placeholder="Give your story a title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="mb-4"
                  maxLength={100}
                />
                <Textarea
                  placeholder="Share your experience, tips, or journey... Be kind and supportive."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="mb-4 min-h-[150px]"
                  maxLength={2000}
                />
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    {categories.filter(c => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsWriting(false)}>Cancel</Button>
                    <Button variant="calm" onClick={handleSubmitPost}>Post Story</Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Posts */}
            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <Card key={post.id} className="p-6 border-0 shadow-soft hover:shadow-medium transition-all">
                  {/* Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-calm-light flex items-center justify-center">
                      <span className="text-sm font-bold text-calm">{post.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                    </div>
                    <span className="ml-auto text-xs font-medium text-calm bg-calm-light px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t border-border">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        post.isLiked ? "text-warmth" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? "fill-warmth" : ""}`} />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                      <MessageCircle className="w-5 h-5" />
                      {post.comments}
                    </button>
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        post.isBookmarked ? "text-calm" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${post.isBookmarked ? "fill-calm" : ""}`} />
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground ml-auto">
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
