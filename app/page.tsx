"use client"

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatToRupiah } from "@/lib/formater";
import { useAuth } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { useEffect } from "react";


export default function Home() {

    useEffect(() => {
      const fetchData =  async () =>{
          const res = await fetch('/api/auth/callback')
      }
      fetchData()
    }, []);
 
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto p-2">
        <HeroSection/>
  
      </div>
    </div>
  );
}
