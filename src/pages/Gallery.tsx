
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import PromptGallery from "@/components/PromptGallery";

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-prompt-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <PromptGallery />
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
