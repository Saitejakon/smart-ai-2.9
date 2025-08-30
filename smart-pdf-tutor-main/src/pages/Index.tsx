import { Hero } from "@/components/Hero";
import { PDFUpload } from "@/components/PDFUpload";
import { ChatInterface } from "@/components/ChatInterface";
import { Features } from "@/components/Features";
import { Reviews } from "@/components/Reviews";
import { StudyMateProvider } from "@/contexts/StudyMateContext";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <StudyMateProvider>
      <div className="min-h-screen">
        <Hero />
        <PDFUpload />
        <ChatInterface />
        <Reviews />
        <Features />
        <Toaster />
      </div>
    </StudyMateProvider>
  );
};

export default Index;
