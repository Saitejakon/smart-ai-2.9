import { Button } from "@/components/ui/button";
import { BookOpen, Brain, FileText, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-study.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Sparkles className="w-5 h-5" />
                AI-Powered Learning
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Study Smarter with{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  StudyMate
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Upload your PDFs and get instant AI-powered answers to your questions. 
                Transform any document into an interactive study companion.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-card rounded-lg shadow-soft">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">PDF Upload</div>
                  <div className="text-xs text-muted-foreground">Drag & drop support</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gradient-card rounded-lg shadow-soft">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Q&A</div>
                  <div className="text-xs text-muted-foreground">Instant answers</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gradient-card rounded-lg shadow-soft">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Smart Learning</div>
                  <div className="text-xs text-muted-foreground">Personalized study</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg"
                className="text-base px-8 py-3"
              >
                Start Learning Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-base px-8 py-3"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-border/50">
              <div>
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50k+</div>
                <div className="text-sm text-muted-foreground">PDFs Processed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="AI-powered learning with StudyMate"
                className="w-full rounded-2xl shadow-large"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-hero rounded-full opacity-20 blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};