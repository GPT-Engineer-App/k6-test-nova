import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paw, Heart, Info } from "lucide-react";

const CatBreed = ({ name, description, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4 overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle className="flex items-center">
          <Paw className="mr-2 h-5 w-5 text-purple-500" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const FactCard = ({ fact }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4">
      <CardContent className="pt-6">
        <CardDescription className="flex items-start">
          <Info className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
          {fact}
        </CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState("breeds");
  const [likeCount, setLikeCount] = useState(0);

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
    { name: "Persian", description: "Characterized by their round face and short muzzle.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
    { name: "Bengal", description: "Known for their wild appearance and energetic personality.", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
    { name: "Sphynx", description: "Distinctive for their lack of coat and wrinkled skin.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
  ];

  const catFacts = [
    "Cats sleep for about 70% of their lives",
    "A group of cats is called a 'clowder'",
    "Cats have over 20 different vocalizations",
    "A cat's sense of smell is 14 times stronger than a human's",
    "The first cat in space was a French cat named Felicette in 1963",
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6 text-center text-purple-800"
        >
          Purrfect Cat World
        </motion.h1>

        <Carousel className="mb-8">
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index}>
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg"
                />
                <p className="text-center mt-2 text-lg font-semibold">{breed.name}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
            <TabsTrigger value="care">Cat Care</TabsTrigger>
            <TabsTrigger value="facts">Fun Facts</TabsTrigger>
          </TabsList>
          <TabsContent value="breeds">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">Popular Cat Breeds</h2>
            <AnimatePresence>
              {catBreeds.map((breed, index) => (
                <CatBreed key={index} name={breed.name} description={breed.description} image={breed.image} />
              ))}
            </AnimatePresence>
          </TabsContent>
          <TabsContent value="care">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">Cat Care Tips</h2>
            <Card className="mb-4">
              <CardContent className="pt-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center"><Heart className="mr-2 h-5 w-5 text-red-500" /> Provide a balanced diet suitable for your cat's age and health condition</li>
                  <li className="flex items-center"><Heart className="mr-2 h-5 w-5 text-red-500" /> Ensure fresh water is always available</li>
                  <li className="flex items-center"><Heart className="mr-2 h-5 w-5 text-red-500" /> Regular grooming to keep their coat healthy</li>
                  <li className="flex items-center"><Heart className="mr-2 h-5 w-5 text-red-500" /> Schedule regular check-ups with a veterinarian</li>
                  <li className="flex items-center"><Heart className="mr-2 h-5 w-5 text-red-500" /> Provide mental stimulation with toys and play sessions</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="facts">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">Fun Cat Facts</h2>
            <AnimatePresence mode="wait">
              <FactCard key={currentFactIndex} fact={catFacts[currentFactIndex]} />
            </AnimatePresence>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-xl text-gray-700 mb-4">
            Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
            independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
            characteristics and personalities.
          </p>
          <Button
            onClick={() => setLikeCount(likeCount + 1)}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Heart className="mr-2 h-5 w-5" /> Like Cats
          </Button>
          <Badge variant="secondary" className="ml-2">
            {likeCount} Likes
          </Badge>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
