import React, { useState } from 'react';
import { Plane, Calendar, DollarSign, Clock, Palmtree, Loader2 } from 'lucide-react';

interface TravelPreferences {
  destination: string;
  budget: string;
  duration: string;
  interests: string;
}

function App() {
  const [preferences, setPreferences] = useState<TravelPreferences>({
    destination: '',
    budget: '',
    duration: '',
    interests: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setItinerary(`Day 1:
- Morning: Explore local markets and cafes
- Afternoon: Visit historical landmarks
- Evening: Sunset dinner at beachfront restaurant

Day 2:
- Morning: Guided cultural tour
- Afternoon: Adventure activities
- Evening: Local entertainment show

Day 3:
- Morning: Relaxation at the beach
- Afternoon: Shopping at artisan markets
- Evening: Farewell dinner at top-rated restaurant`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">AI Travel Planner</h1>
          <p className="text-lg text-indigo-700">Create your perfect journey with AI-powered personalized itineraries</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                  <Plane className="w-5 h-5 mr-2 text-indigo-600" />
                  Destination
                </label>
                <input
                  type="text"
                  value={preferences.destination}
                  onChange={(e) => setPreferences({...preferences, destination: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Where do you want to go?"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                  <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
                  Budget
                </label>
                <select
                  value={preferences.budget}
                  onChange={(e) => setPreferences({...preferences, budget: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Select budget range</option>
                  <option value="budget">Budget ($0-1000)</option>
                  <option value="moderate">Moderate ($1000-3000)</option>
                  <option value="luxury">Luxury ($3000+)</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                  <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                  Duration
                </label>
                <input
                  type="number"
                  value={preferences.duration}
                  onChange={(e) => setPreferences({...preferences, duration: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Number of days"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                  <Palmtree className="w-5 h-5 mr-2 text-indigo-600" />
                  Interests
                </label>
                <textarea
                  value={preferences.interests}
                  onChange={(e) => setPreferences({...preferences, interests: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="What are your interests? (e.g., culture, food, adventure)"
                  rows={3}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Generating Itinerary...
                  </>
                ) : (
                  'Generate Itinerary'
                )}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Your Itinerary</h2>
            </div>
            
            {!itinerary && !isGenerating && (
              <div className="h-full flex items-center justify-center text-gray-500 text-center">
                <p>Fill out your preferences and generate your personalized travel itinerary!</p>
              </div>
            )}

            {isGenerating && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
                  <p className="text-gray-600">Creating your perfect journey...</p>
                </div>
              </div>
            )}

            {itinerary && !isGenerating && (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 bg-gray-50 rounded-lg p-6">
                  {itinerary}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
            alt="Travel inspiration"
            className="rounded-2xl shadow-xl mx-auto mb-8"
          />
          <p className="text-gray-600">Let AI help you plan your next adventure!</p>
        </div>
      </div>
    </div>
  );
}

export default App;