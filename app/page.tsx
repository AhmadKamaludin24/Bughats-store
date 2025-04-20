"use client"

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import { Spotlight } from "@/components/ui/aceternity/spotlight-new";


export default function Home() {


 
  return (
    <div className="relative overflow-hidden">
        
      <div className="max-w-7xl mx-auto p-2 bg-card-foreground">
      <Navbar/>
   
        <Spotlight/>
 
    
        <HeroSection/>
  
      </div>
    </div>
  );
}
