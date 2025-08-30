import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

interface Review {
  id: string;
  name: string;
  avatar: string;
  role: string;
  university: string;
  rating: number;
  review: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/placeholder.svg",
    role: "Computer Science Student",
    university: "MIT",
    rating: 5,
    review: "StudyMate has revolutionized how I study! The AI understands my textbooks perfectly and gives me exactly the explanations I need. My grades have improved significantly since I started using it.",
    date: "2 weeks ago"
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: "/placeholder.svg",
    role: "Medical Student",
    university: "Johns Hopkins",
    rating: 5,
    review: "As a med student, I deal with hundreds of pages daily. StudyMate's ability to instantly answer questions from my medical textbooks is incredible. It's like having a personal tutor 24/7.",
    date: "1 month ago"
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    avatar: "/placeholder.svg",
    role: "Engineering Student",
    university: "Stanford University",
    rating: 4,
    review: "The PDF processing is lightning fast and the AI responses are surprisingly accurate. It's helped me understand complex engineering concepts that I struggled with before.",
    date: "3 weeks ago"
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "/placeholder.svg",
    role: "Business Student",
    university: "Harvard Business School",
    rating: 5,
    review: "StudyMate made studying for case studies so much easier. I can upload multiple documents and get comprehensive answers that connect concepts across different materials.",
    date: "1 week ago"
  },
  {
    id: "5",
    name: "Priya Patel",
    avatar: "/placeholder.svg",
    role: "Psychology Major",
    university: "University of California",
    rating: 5,
    review: "The contextual answers are amazing. Instead of generic responses, StudyMate gives me specific information from my course materials. It's exactly what I needed for effective studying.",
    date: "2 months ago"
  },
  {
    id: "6",
    name: "Alex Thompson",
    avatar: "/placeholder.svg",
    role: "Graduate Student",
    university: "Oxford University",
    rating: 4,
    review: "Perfect for research papers and thesis work. The AI helps me understand complex academic papers and makes connections I might have missed. Highly recommend!",
    date: "1 month ago"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating 
              ? "fill-yellow-400 text-yellow-400" 
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
};

export const Reviews = () => {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Students Are Saying</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of students who are already studying smarter with StudyMate
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
            </div>
            <div className="text-muted-foreground">
              Based on {totalReviews}+ reviews
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="relative">
                <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback className="bg-gradient-hero text-white">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                    <p className="text-xs text-muted-foreground">{review.university}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>

                <blockquote className="text-sm leading-relaxed mb-4 relative z-10">
                  "{review.review}"
                </blockquote>

                <div className="text-xs text-muted-foreground">
                  {review.date}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-sm font-medium">
              Join {totalReviews * 150}+ students already studying with StudyMate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};