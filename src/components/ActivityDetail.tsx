import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Music } from 'lucide-react';
import { usePoints } from '../context/PointsContext';

const activityDetails = {
  eating: {
    title: 'Eating Guide',
    steps: [
      {
        text: 'Sit comfortably at the table',
        video: './src/videos/eating/step1.mp4' // Local video path
      },
      {
        text: 'Use proper utensils',
        video: 'src/videos/eating/step2.mp4'
      },
      {
        text: 'Take small bites',
        video: 'src/videos/eating/step3.mp4'
      },
      {
        text: 'Chew slowly and carefully',
        video: 'src/videos/eating/step4.mp4'
      },
      {
        text: 'Drink water between bites',
        video: 'src/videos/eating/step5.mp4'
      }
    ],
    image: './src/videos/images/Designer.png'
  },
  bathing: {
    title: 'Bathing Guide',
    steps: [
      {
        text: 'Check water temperature',
        video: 'YOUR_VIDEO_URL_HERE_6' // Replace with your video URL
      },
      {
        text: 'Use mild soap',
        video: 'YOUR_VIDEO_URL_HERE_7' // Replace with your video URL
      },
      {
        text: 'Wash from top to bottom',
        video: 'YOUR_VIDEO_URL_HERE_8' // Replace with your video URL
      },
      {
        text: 'Rinse thoroughly',
        video: 'YOUR_VIDEO_URL_HERE_9' // Replace with your video URL
      },
      {
        text: 'Dry carefully',
        video: 'YOUR_VIDEO_URL_HERE_10' // Replace with your video URL
      }
    ],
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800'
  },
  dressing: {
    title: 'Dressing Guide',
    steps: [
      {
        text: 'Gather your clothes',
        video: 'YOUR_VIDEO_URL_HERE_11' // Replace with your video URL
      },
      {
        text: 'Put on undergarments',
        video: 'YOUR_VIDEO_URL_HERE_12' // Replace with your video URL
      },
      {
        text: 'Put on shirt/top',
        video: 'YOUR_VIDEO_URL_HERE_13' // Replace with your video URL
      },
      {
        text: 'Put on pants/bottom',
        video: 'YOUR_VIDEO_URL_HERE_14' // Replace with your video URL
      },
      {
        text: 'Put on socks and shoes',
        video: 'YOUR_VIDEO_URL_HERE_15' // Replace with your video URL
      }
    ],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800'
  },
  brushing: {
    title: 'Brushing Guide',
    steps: [
      {
        text: 'Wet your toothbrush',
        video: 'YOUR_VIDEO_URL_HERE_16' // Replace with your video URL
      },
      {
        text: 'Apply toothpaste',
        video: 'YOUR_VIDEO_URL_HERE_17' // Replace with your video URL
      },
      {
        text: 'Brush all teeth surfaces',
        video: 'YOUR_VIDEO_URL_HERE_18' // Replace with your video URL
      },
      {
        text: 'Brush your tongue',
        video: 'YOUR_VIDEO_URL_HERE_19' // Replace with your video URL
      },
      {
        text: 'Rinse your mouth',
        video: 'YOUR_VIDEO_URL_HERE_20' // Replace with your video URL
      }
    ],
    image: 'https://images.unsplash.com/photo-1588454896012-5c048c0912b8?auto=format&fit=crop&q=80&w=800'
  },
  yoga: {
    title: 'Yoga Guide',
    steps: [
      {
        text: 'Find a quiet space',
        video: 'YOUR_VIDEO_URL_HERE_21' // Replace with your video URL
      },
      {
        text: 'Lay out your mat',
        video: 'YOUR_VIDEO_URL_HERE_22' // Replace with your video URL
      },
      {
        text: 'Take deep breaths',
        video: 'YOUR_VIDEO_URL_HERE_23' // Replace with your video URL
      },
      {
        text: 'Follow simple poses',
        video: 'YOUR_VIDEO_URL_HERE_24' // Replace with your video URL
      },
      {
        text: 'Relax and stretch',
        video: 'YOUR_VIDEO_URL_HERE_25' // Replace with your video URL
      }
    ],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  sleeping: {
    title: 'Sleeping Guide',
    steps: [
      {
        text: 'Put on pajamas',
        video: 'YOUR_VIDEO_URL_HERE_26' // Replace with your video URL
      },
      {
        text: 'Brush teeth',
        video: 'YOUR_VIDEO_URL_HERE_27' // Replace with your video URL
      },
      {
        text: 'Use the bathroom',
        video: 'YOUR_VIDEO_URL_HERE_28' // Replace with your video URL
      },
      {
        text: 'Get into bed',
        video: 'YOUR_VIDEO_URL_HERE_29' // Replace with your video URL
      },
      {
        text: 'Close your eyes',
        video: 'YOUR_VIDEO_URL_HERE_30' // Replace with your video URL
      }
    ],
    image: 'https://images.unsplash.com/photo-1631155908067-3c9dea878545?auto=format&fit=crop&q=80&w=800'
  },
  learning: {
    title: 'Learning Guide',
    steps: [
      {
        text: 'Sit at your desk',
        video: 'YOUR_VIDEO_URL_HERE_31' // Replace with your video URL
      },
      {
        text: 'Open your books',
        video: 'YOUR_VIDEO_URL_HERE_32' // Replace with your video URL
      },
      {
        text: 'Read carefully',
        video: 'YOUR_VIDEO_URL_HERE_33' // Replace with your video URL
      },
      {
        text: 'Take notes',
        video: 'YOUR_VIDEO_URL_HERE_34' // Replace with your video URL
      },
      {
        text: 'Practice exercises',
        video: 'YOUR_VIDEO_URL_HERE_35' // Replace with your video URL
      }
    ],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'
  },
  music: {
    title: 'Music Guide',
    steps: [
      {
        text: 'Choose your instrument',
        video: 'YOUR_VIDEO_URL_HERE_36' // Replace with your video URL
      },
      {
        text: 'Sit properly',
        video: 'YOUR_VIDEO_URL_HERE_37' // Replace with your video URL
      },
      {
        text: 'Follow the rhythm',
        video: 'YOUR_VIDEO_URL_HERE_38' // Replace with your video URL
      },
      {
        text: 'Practice notes',
        video: 'YOUR_VIDEO_URL_HERE_39' // Replace with your video URL
      },
      {
        text: 'Make music!',
        video: 'YOUR_VIDEO_URL_HERE_40' // Replace with your video URL
      }
    ],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800'
  }
};

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showStep, setShowStep] = useState(false);
  const { markActivityComplete, completedActivities } = usePoints();
  
  const activity = activityDetails[id as keyof typeof activityDetails];

  useEffect(() => {
    setShowStep(false);
    const timer = setTimeout(() => {
      setShowStep(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStep]);

  if (!activity) {
    return <div>Activity not found</div>;
  }

  const isLastStep = currentStep === activity.steps.length;
  const alreadyCompleted = completedActivities.has(id || '');

  const handleNext = () => {
    if (currentStep < activity.steps.length) {
      setCurrentStep(prev => prev + 1);
      if (currentStep === activity.steps.length - 1) {
        setCompleted(true);
        if (!alreadyCompleted) {
          markActivityComplete(id || '');
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Activities</span>
      </button>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-scale-in">
        <div className="relative">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        </div>
        
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{activity.title}</h2>
          
          {!isLastStep ? (
            <div className="space-y-6">
              <div className={`flex flex-col space-y-4 ${showStep ? 'step-animation' : 'opacity-0'}`}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center animate-step-number">
                    <span className="text-purple-600 font-semibold">{currentStep + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-lg pt-1">{activity.steps[currentStep].text}</p>
                  </div>
                </div>
                
                <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                  <video
                    src={activity.steps[currentStep].video}
                    className="w-full h-full"
                    controls
                    autoPlay
                    playsInline
                  >
                    Your browser does not support the video element.
                  </video>
                </div>
              </div>
              
              <button
                onClick={handleNext}
                className="mt-8 flex items-center justify-center space-x-2 w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span>Next Step</span>
                <ArrowRight className="w-5 h-5 animate-bounce" />
              </button>
            </div>
          ) : (
            <div className="text-center space-y-6 animate-scale-in">
              <div className="flex flex-col items-center space-y-4">
                {alreadyCompleted ? (
                  <Check className="w-16 h-16 text-green-500 animate-bounce" />
                ) : (
                  <Music className="w-16 h-16 text-purple-500 animate-bounce" />
                )}
                <h3 className="text-2xl font-bold text-gray-800">
                  {alreadyCompleted ? 'Already Completed!' : 'Congratulations!'}
                </h3>
                <p className="text-gray-600">
                  {alreadyCompleted 
                    ? "You've already mastered this activity!" 
                    : "You've completed all steps and earned 10 points!"}
                </p>
                {!alreadyCompleted && (
                  <div className="py-4 animate-fade-in">
                    <audio controls className="mt-4">
                      <source src="https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav" type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate('/')}
                className="mt-8 inline-flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span>Back to Activities</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              {activity.steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 transform ${
                    index === currentStep ? 'scale-150 bg-purple-600' :
                    index < currentStep ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;