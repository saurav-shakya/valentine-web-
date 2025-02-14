import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  TextField,
  CircularProgress,
  Slider,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Confetti from 'react-confetti';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ImageIcon from '@mui/icons-material/Image';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface DashboardProps {
  isSingle: boolean | null;
}

const Dashboard = ({ isSingle }: DashboardProps) => {
  const [nameStates, setNameStates] = useState({
    breakupName: '',
    friendzoneName: '',
    predictionName: '',
    authenticityName: '',
    durationName: '',
    roastName: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [breakupCount, setBreakupCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [relationshipDuration, setRelationshipDuration] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSingle === false) {
      window.location.href = '/';
    }
    // Start random breakup counter
    const interval = setInterval(() => {
      setBreakupCount(prev => prev + Math.floor(Math.random() * 10));
    }, 2000);
    return () => clearInterval(interval);
  }, [isSingle]);

  const handleFeatureClick = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(path);
    }, 1000);
  };

  const generateBreakupLetter = async () => {
    if (!nameStates.breakupName) {
      setResult('Naam toh daal de bhai! 🤦‍♂️');
      return;
    }
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Create a super savage breakup letter in pure Hinglish (mix of Hindi and English). DO NOT use pure Hindi or pure English.

      Points to cover (all in Hinglish only):
      - Desi parents ke taunts (jaise "Sharma ji ka beta/beti is better")
      - Latest viral memes aur trending jokes
      - Instagram/social media ke references
      - Career-related burns (jaise "UPSC ki taiyari kar le")
      - Relationship red flags with funny examples
      - Future predictions (ekdum impossible aur funny)
      - Thoda emotional drama (par funny hona chahiye)
      
      Make it sound like desi friends giving savage advice at 3 AM. Use trending Indian references.
      Response should be 100% in Hinglish - no pure Hindi or English sentences.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
      if (audioRef.current) {
        audioRef.current.play();
      }
    } catch (error) {
      setResult('Error generating letter. Lagta hai tera breakup itna toxic hai ki AI bhi handle nahi kar paa raha! 🔥');
    }
    setLoading(false);
  };

  const generateFriendzoneReport = async () => {
    if (!nameStates.friendzoneName) {
      setResult('Naam toh daal de bhai! 🤦‍♂️');
      return;
    }
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Create a hilarious friendzone report card in pure Hinglish (no pure Hindi/English).

      Points to cover (all in Hinglish only):
      - Friendzone level with funny metrics
      - Friendzone hone ke reasons (ekdum funny)
      - "Just friends" ke signs with examples
      - Future friendship predictions
      - Moving on ke liye savage advice
      - Desi parents ke reactions
      - Friend vs Lover comparison
      - Red flags jo dikhe nahi
      
      Make it sound like friends chatting at chai tapri. Use current desi trends and memes.
      Response should be 100% in Hinglish - no pure Hindi or English sentences.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
      if (audioRef.current) {
        audioRef.current.play();
      }
    } catch (error) {
      setResult('Error generating report. Teri friendzone story itni sad hai ki AI ko bhi rona aa gaya! 😭');
    }
    setLoading(false);
  };

  const generateRelationshipPrediction = async () => {
    if (!nameStates.predictionName) {
      setResult('Naam toh daal de bhai! 🤦‍♂️');
      return;
    }
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Create a hilarious relationship prediction in pure Hinglish (no pure Hindi/English).

      Points to cover (all in Hinglish only):
      - Love kab milega (impossible predictions, jaise "jab Modiji retirement lenge")
      - Kaisa partner milega (creative and funny)
      - Parallel universe mein relationship status
      - Dating apps pe kya hoga
      - Future wedding scenarios
      - Desi parents ke reactions
      - Career vs Love life comparison
      - Red flags to watch out for
      
      Make it sound like street-smart friends giving advice. Use trending desi memes.
      Response should be 100% in Hinglish - no pure Hindi or English sentences.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error) {
      setResult('Error generating prediction. Teri kismat itni kharab hai ki AI bhi predict nahi kar paa raha! 💀');
    }
    setLoading(false);
  };

  const checkValentineChances = () => {
    const random = Math.random() * 100;
    if (random < 0.001) {
      setResult('🎉 IMPOSSIBLE ACHIEVEMENT UNLOCKED! Tujhe pyaar mil gaya! \n\nLekin ye simulation hai, real life mein:\n\n1. Tera crush already committed hai 💔\n2. Uske parents ko "log kya kahenge" ki tension hai 👀\n3. Tu abhi tak UPSC ki taiyari kar raha hai 📚\n4. Tere paas Netflix ka subscription bhi nahi hai 😂\n\nBetter luck next janm! 🚀');
    } else {
      const savageResponses = [
        '💔 Error 404: Valentine.exe has stopped working!\nReason: Teri shakal dekh ke system crash ho gaya!',
        '🚫 Tu relationship mein aane se pehle:\n- Apni shakal theek kar\n- Bank balance badha\n- Instagram followers badha\n- Cooking seekh le\nTab tak single hi reh! 😂',
        '😂 Breaking News: Tera Valentine milne se pehle:\n- Petrol 50 rupee/liter ho jayega\n- India Mars pe colony bana lega\n- Tu job dhund lega\n- Sharma ji ka beta fail ho jayega',
        '🤣 Valentine Status:\n- Loading...\n- Loading...\n- Loading...\n- Failed to Load!\nTeri kismat itni kharab hai, loading bhi nahi ho rahi! 💀',
        '💀 Tu relationship mein aaya toh:\n- Economy crash ho jayegi\n- World War 3 start ho jayega\n- Aliens attack kar denge\nPlease single reh, duniya bach jayegi! 🙏'
      ];
      setResult(savageResponses[Math.floor(Math.random() * savageResponses.length)]);
    }
    setShowConfetti(random < 0.001);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const analyzeExPhoto = async () => {
    if (!selectedImage) {
      setResult('Photo toh upload kar bhai! 🤦‍♂️');
      return;
    }
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const prompt = `Analyze this ex's photo and generate a hilarious and savage reality check in Hinglish (mix of Hindi and English). Include:
      - Where they might be now (make it funny and impossible)
      - What they're probably doing (use trending references)
      - Their relationship status (be creative and savage)
      - Future predictions (make it super funny)
      - Red flags you can spot
      Make it super funny and use lots of emojis!`;
      
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Data = reader.result?.toString().split(',')[1];
          if (!base64Data) throw new Error('Failed to convert image');

          const imageData = {
            inlineData: {
              data: base64Data,
              mimeType: selectedImage.type
            }
          };

          const result = await model.generateContent([prompt, imageData]);
          const response = await result.response;
          setResult(response.text());
          
          // Play sound effect
          if (audioRef.current) {
            audioRef.current.play();
          }
        } catch (error) {
          console.error('Error in image analysis:', error);
          setResult('Teri ex ki photo itni complex hai ki AI ka system hang ho gaya! 😂\nTry another photo ya fir rehne de, move on kar le! 🚀');
        }
      };
      reader.readAsDataURL(selectedImage);
    } catch (error) {
      console.error('Error setting up image analysis:', error);
      setResult('Error analyzing photo. Shayad teri ex ki photo itni bekar hai ki AI bhi process nahi kar paa raha! 💀');
    }
    setLoading(false);
  };

  const checkRelationshipAuthenticity = async () => {
    if (!nameStates.authenticityName) {
      setResult('Naam toh daal de bhai! 🤦‍♂️');
      return;
    }
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Create a funny relationship analysis in pure Hinglish (no pure Hindi/English).

      Points to cover (all in Hinglish only):
      - Netflix subscription status
      - Food delivery patterns
      - Shopping habits
      - Red flags with funny examples
      
      Make it super entertaining like friends gossiping. Use desi references.
      Response should be 100% in Hinglish - no pure Hindi or English sentences.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error) {
      setResult('Error checking relationship. Lagta hai tere relationship mein itna drama hai ki AI bhi samajh nahi paa raha! 😂');
    }
    setLoading(false);
  };

  const predictRelationshipDuration = async () => {
    if (!nameStates.durationName) {
      setResult('Naam toh daal de bhai! 🤦‍♂️');
      return;
    }
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Generate a hilarious relationship duration prediction in pure Hinglish (no pure Hindi/English).

      Points to cover (all in Hinglish only):
      - Breakup date with funny reason
      - Breakup ka reason kya hoga
      - Future ke liye savage advice
      
      Make it super entertaining like friends roasting at midnight.
      Response should be 100% in Hinglish - no pure Hindi or English sentences.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error) {
      setResult('Error predicting duration. Teri relationship ki expiry date itni complex hai ki AI bhi calculate nahi kar paa raha! 😅');
    }
    setLoading(false);
  };

  const generateAagLagaoMessage = async () => {
    if (!nameStates.roastName) {
      setResult('Naam toh daal de bhai! 🤦‍♂️');
      return;
    }
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Generate an extremely savage message in pure Hinglish (no pure Hindi/English).

      Points to cover (all in Hinglish only):
      - Desi references and taunts
      - Latest viral memes
      - Government job references
      - Social media jokes
      
      Make it burn but keep it funny. Use desi style roasting.
      Response should be 100% in Hinglish - no pure Hindi or English sentences.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
    } catch (error) {
      setResult('Error generating message. Tera gussa itna toxic hai ki AI bhi handle nahi kar paa raha! 🔥');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      py: { xs: 2, md: 4 },
      px: { xs: 1, md: 2 },
      position: 'relative',
      overflow: 'hidden'
    }}>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} sx={{ color: '#ff1744' }} />
          <Typography variant="h5" sx={{ color: '#fff', mt: 2 }}>
            Loading Savage Mode... 🔥
          </Typography>
        </Box>
      )}

      {/* Animated background elements */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ 
            y: -20, 
            x: Math.random() * window.innerWidth,
            opacity: 0.3
          }}
          animate={{ 
            y: window.innerHeight + 20,
            opacity: 0
          }}
          transition={{ 
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            position: 'absolute',
            color: '#ff1744',
            fontSize: Math.random() * 20 + 10,
            zIndex: 1
          }}
        >
          {['💔', '😭', '🚫', '💀', '😂'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}

      {showConfetti && <Confetti 
        colors={['#ff1744', '#f50057', '#ff4081']}
        gravity={0.2}
      />}
      <audio ref={audioRef} src="/rip-love.mp3" />
      
      <Container maxWidth="lg">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={24}
            sx={{ 
              p: 3, 
              mb: 4, 
              background: 'rgba(255, 23, 68, 0.1)',
              borderRadius: 4,
              border: '1px solid rgba(255, 23, 68, 0.3)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255,23,68,0.1) 0%, rgba(255,23,68,0) 100%)',
                animation: 'gradient 5s ease infinite',
              }
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            >
              <Typography variant="h3" sx={{ color: '#ff1744', fontWeight: 'bold' }}>
                Valentine's Destruction 2025 💔
              </Typography>
            </motion.div>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <LocalFireDepartmentIcon sx={{ color: '#ff1744', fontSize: 30 }} />
              <Typography variant="h6" sx={{ color: '#fff' }}>
                Live Breakup Counter: {breakupCount} couples ka aaj breakup ho gaya 😈
              </Typography>
              <HeartBrokenIcon sx={{ color: '#ff1744', fontSize: 30 }} />
            </Box>
          </Paper>
        </motion.div>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Feature Cards */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ 
                height: '100%',
                background: 'rgba(26, 26, 26, 0.9)',
                borderRadius: 4,
                border: '1px solid rgba(255, 23, 68, 0.3)',
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <HeartBrokenIcon sx={{ color: '#ff1744', fontSize: 30, mr: 1 }} />
                    <Typography variant="h5" sx={{ color: '#ff1744' }}>
                      Ex Roasting Section
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#fff', mb: 2 }}>
                    Ex ki photo upload karo, AI unki band bajayega! Plus savage messages bhi generate karega! 🔥
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    fullWidth
                    variant="contained"
                    onClick={() => handleFeatureClick('/ex-roast')}
                    sx={{ 
                      py: 1.5,
                      background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                      }
                    }}
                  >
                    Ex Ko Roast Karo 🔥
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card sx={{ 
                height: '100%',
                background: 'rgba(26, 26, 26, 0.9)',
                borderRadius: 4,
                border: '1px solid rgba(255, 23, 68, 0.3)',
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <QuizIcon sx={{ color: '#ff1744', fontSize: 30, mr: 1 }} />
                    <Typography variant="h5" sx={{ color: '#ff1744' }}>
                      Relationship Quiz
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#fff', mb: 2 }}>
                    Pata karo tumhara relationship kitne din chalega! AI batayega future ka haal! 🔮
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    fullWidth
                    variant="contained"
                    onClick={() => handleFeatureClick('/relationship-quiz')}
                    sx={{ 
                      py: 1.5,
                      background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                      }
                    }}
                  >
                    Quiz Start Karo 📝
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card sx={{ 
                height: '100%',
                background: 'rgba(26, 26, 26, 0.9)',
                borderRadius: 4,
                border: '1px solid rgba(255, 23, 68, 0.3)',
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocalFireDepartmentIcon sx={{ color: '#ff1744', fontSize: 30, mr: 1 }} />
                    <Typography variant="h5" sx={{ color: '#ff1744' }}>
                      Savage Generator
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    label="Kiska Dil Todna Hai?"
                    value={nameStates.breakupName}
                    onChange={(e) => setNameStates(prev => ({ ...prev, breakupName: e.target.value }))}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(255, 23, 68, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 23, 68, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#ff1744',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .MuiInputBase-input': {
                        color: '#fff',
                      }
                    }}
                    variant="outlined"
                  />
                  <Button 
                    fullWidth
                    variant="contained"
                    onClick={generateBreakupLetter}
                    disabled={loading || !nameStates.breakupName}
                    sx={{ 
                      mb: 2,
                      py: 1.5,
                      background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                      }
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size={24} sx={{ mr: 1 }} />
                        Generating...
                      </Box>
                    ) : 'Breakup Letter Generate Karo 💔'}
                  </Button>
                  <Button 
                    fullWidth
                    variant="contained"
                    onClick={generateFriendzoneReport}
                    disabled={loading || !nameStates.friendzoneName}
                    sx={{ 
                      py: 1.5,
                      background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                      }
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size={24} sx={{ mr: 1 }} />
                        Generating...
                      </Box>
                    ) : 'Friendzone Report Card 🤝'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Relationship Prediction */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Paper sx={{ 
                p: 3, 
                background: 'rgba(26, 26, 26, 0.9)',
                borderRadius: 4,
                border: '1px solid rgba(255, 23, 68, 0.3)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HeartBrokenIcon sx={{ color: '#ff1744', fontSize: 30, mr: 1 }} />
                  <Typography variant="h5" sx={{ color: '#ff1744' }}>
                    Future Love Prediction 🔮
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Kiski Kismat Check Karni Hai?"
                  value={nameStates.predictionName}
                  onChange={(e) => setNameStates(prev => ({ ...prev, predictionName: e.target.value }))}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
                <Button 
                  variant="contained" 
                  onClick={generateRelationshipPrediction}
                  disabled={loading}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Kismat Check Karo 🎲'}
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Valentine Chances */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Paper sx={{ 
                p: 3, 
                background: 'rgba(26, 26, 26, 0.9)',
                borderRadius: 4,
                border: '1px solid rgba(255, 23, 68, 0.3)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalFireDepartmentIcon sx={{ color: '#ff1744', fontSize: 30, mr: 1 }} />
                  <Typography variant="h5" sx={{ color: '#ff1744' }}>
                    Valentine Chances Calculator 🎲
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  onClick={checkValentineChances}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                    }
                  }}
                >
                  Chances Check Karo (Warning: Dil Toot Sakta Hai) ⚠️
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Ex Photo Reality Check */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Paper sx={{ 
                p: 3, 
                background: 'rgba(26, 26, 26, 0.9)',
                borderRadius: 4,
                border: '1px solid rgba(255, 23, 68, 0.3)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ImageIcon sx={{ color: '#ff1744', fontSize: 30, mr: 1 }} />
                  <Typography variant="h5" sx={{ color: '#ff1744' }}>
                    Ex Ki Reality Check 📸
                  </Typography>
                </Box>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                />
                <Button 
                  variant="outlined"
                  fullWidth
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ mb: 2 }}
                >
                  Ex Ki Photo Upload Karo 🖼️
                </Button>
                {selectedImage && (
                  <Typography sx={{ mb: 2, color: '#fff' }}>
                    Selected: {selectedImage.name}
                  </Typography>
                )}
                <Button 
                  variant="contained"
                  onClick={analyzeExPhoto}
                  disabled={loading || !selectedImage}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Reality Check Karo 🔍'}
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Relationship or Recharge Test */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Paper sx={{ 
                p: 3, 
                background: 'rgba(26, 26, 26, 0.9)',
                borderRadius: 4,
                border: '1px solid rgba(255, 23, 68, 0.3)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalFireDepartmentIcon sx={{ color: '#ff1744', fontSize: 30, mr: 1 }} />
                  <Typography variant="h5" sx={{ color: '#ff1744' }}>
                    Relationship ya Recharge? 🎭
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Kis Bevkoof Ka Test Karna Hai?"
                  value={nameStates.authenticityName}
                  onChange={(e) => setNameStates(prev => ({ ...prev, authenticityName: e.target.value }))}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
                <Button 
                  variant="contained"
                  onClick={checkRelationshipAuthenticity}
                  disabled={loading}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Sachai Check Karo 🔍'}
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Relationship Duration Predictor */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <Paper sx={{ 
                p: 3, 
                background: 'rgba(26, 26, 26, 0.9)',
                borderRadius: 4,
                border: '1px solid rgba(255, 23, 68, 0.3)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HeartBrokenIcon sx={{ color: '#ff1744', fontSize: 30, mr: 1 }} />
                  <Typography variant="h5" sx={{ color: '#ff1744' }}>
                    Relationship Expiry Calculator ⏳
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Kiska Relationship Test Karna Hai?"
                  value={nameStates.durationName}
                  onChange={(e) => setNameStates(prev => ({ ...prev, durationName: e.target.value }))}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
                <Typography sx={{ color: '#fff', mb: 1 }}>
                  Relationship Duration (Months):
                </Typography>
                <Slider
                  value={relationshipDuration}
                  onChange={(_, value) => setRelationshipDuration(value as number)}
                  min={1}
                  max={12}
                  marks
                  sx={{ mb: 2 }}
                />
                <Button 
                  variant="contained"
                  onClick={predictRelationshipDuration}
                  disabled={loading}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Expiry Date Check Karo ⏰'}
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Aag Lagao Message Generator */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <Paper sx={{ 
                p: 3, 
                background: 'rgba(26, 26, 26, 0.9)',
                borderRadius: 4,
                border: '1px solid rgba(255, 23, 68, 0.3)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalFireDepartmentIcon sx={{ color: '#ff1744', fontSize: 30, mr: 1 }} />
                  <Typography variant="h5" sx={{ color: '#ff1744' }}>
                    Aag Lagao Message Generator 🔥
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Kisko Jalana Hai?"
                  value={nameStates.roastName}
                  onChange={(e) => setNameStates(prev => ({ ...prev, roastName: e.target.value }))}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
                <Button 
                  variant="contained"
                  onClick={generateAagLagaoMessage}
                  disabled={loading}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Aag Lagao 🔥'}
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Result Display */}
          {result && (
            <Grid item xs={12}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Paper sx={{ 
                  p: 4, 
                  background: 'rgba(26, 26, 26, 0.95)',
                  borderRadius: 4,
                  border: '2px solid #ff1744'
                }}>
                  <Typography variant="h5" sx={{ color: '#ff1744', mb: 2 }}>
                    Savage Result 🔥
                  </Typography>
                  <Typography 
                    sx={{ 
                      whiteSpace: 'pre-line', 
                      color: '#fff',
                      fontSize: '1.2rem',
                      lineHeight: 1.6
                    }}
                  >
                    {result}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          mt: 4,
          pb: 2,
          textAlign: 'center',
          borderTop: '1px solid rgba(255,23,68,0.3)',
          pt: 2
        }}
      >
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
          Created with 💔 by Saurav
        </Typography>
        <Typography 
          component="a"
          href="https://x.com/sauravv_x"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            color: '#1DA1F2',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          @sauravv_x
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard; 