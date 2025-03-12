import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BreadcumbComponents from "./_components/BreadcumbComponents";


export default function Page() {
  return (
    <>
     <BreadcumbComponents page=""/>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0  ">
    <div className="grid auto-rows-min p-16 rounded-2xl flex-1 gap-4 md:grid-cols-2 bg-muted/100">
      <Card className=" aspect-video" >
        <CardContent>
          <h1 className="text-3xl">Total user:</h1>
        </CardContent>
      </Card>
      <Card className=" aspect-video" >
      <CardContent>
          <h1 className="text-3xl">Total Products:</h1>
        </CardContent>
      </Card>
      
    </div>
    
    </div>
    
    </>
   
  )
}
