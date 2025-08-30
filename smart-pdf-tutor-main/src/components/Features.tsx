import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  FileSearch, 
  Clock,
  BookOpen,
  TrendingUp,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Analysis",
    description: "Our AI deeply understands your documents, providing contextual and accurate answers to complex questions.",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get answers instantly. No waiting around - StudyMate processes your questions in real-time.",
    color: "text-yellow-500"
  },
  {
    icon: FileSearch,
    title: "Smart Document Search",
    description: "Automatically finds relevant sections from your PDFs to support every answer with citations.",
    color: "text-accent"
  },
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your documents stay secure. We use enterprise-grade encryption to protect your study materials.",
    color: "text-green-500"
  },
  {
    icon: BookOpen,
    title: "Multi-Format Support",
    description: "Works with textbooks, research papers, lecture notes, and any PDF-based study material.",
    color: "text-blue-500"
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Share insights with study groups and collaborate on difficult concepts together.",
    color: "text-purple-500"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your learning progress and identify areas that need more attention.",
    color: "text-orange-500"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Study anytime, anywhere. Your AI tutor never sleeps and is always ready to help.",
    color: "text-indigo-500"
  },
  {
    icon: Globe,
    title: "Multiple Languages",
    description: "Supports documents and questions in multiple languages for international students.",
    color: "text-teal-500"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Students Love{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              StudyMate
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the powerful features that make StudyMate the ultimate AI study companion
            for students worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 border-0 group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="bg-gradient-card rounded-2xl p-8 shadow-large">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Trusted by Students Worldwide</h3>
              <p className="text-muted-foreground">
                Join thousands of students who have transformed their learning experience
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">10,000+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">50,000+</div>
                <div className="text-sm text-muted-foreground">PDFs Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">1M+</div>
                <div className="text-sm text-muted-foreground">Questions Answered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};