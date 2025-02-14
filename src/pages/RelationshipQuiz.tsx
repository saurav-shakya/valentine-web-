import { useState, useRef } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const questions = [
  {
    question: "Tumhare partner ka phone password tumhe yaad hai?",
    options: [
      "Haan, unka phone toh mera hi hai 😎",
      "Nahi, trust issues hai 😅",
      "Password? Wo toh face unlock use karte hai 🤔",
      "Maine try kiya par galat tha 💀"
    ]
  },
  {
    question: "Valentine's Day pe kya plan hai?",
    options: [
      "Candle light dinner at Sharma ji ki thadi 🕯️",
      "Netflix and overthinking 📺",
      "Ex ko stalk karna Instagram pe 🕵️",
      "Rona dhona with friends 😭"
    ]
  },
  {
    question: "Relationship mein sabse bada red flag?",
    options: [
      "Wo meri har baat pe 'k' reply karte hai 🚩",
      "Unke bestie ke intentions theek nahi lag rahe 👀",
      "Wo mere memes pe nahi haste 😤",
      "Unko momos pasand nahi hai 🥟"
    ]
  },
  {
    question: "Tumhare relationship ka status kya hai?",
    options: [
      "It's complicated (matlab kuch bhi nahi hai) 🤷",
      "Situationship mein hu 🎭",
      "Commitment phobia hai 😰",
      "Main single hu, ye quiz timepass ke liye kar raha hu 🤡"
    ]
  },
  {
    question: "Break up ke baad kya karoge?",
    options: [
      "Gym join karunga, body banaunga 💪",
      "LinkedIn pe job updates dalunga 💼",
      "Naya relationship dhundunga 🔍",
      "Ghar walon ke saath shaadi ke liye ready ho jaunga 👰"
    ]
  }
];

const RelationshipQuiz = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === questions.length - 1) {
      generateResult();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const generateResult = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Based on these quiz answers, create a hilarious relationship analysis in pure Hinglish (no pure Hindi/English).

      Points to cover (all in Hinglish only):
      - Relationship ka current status
      - Red flags jo dikhe nahi (be creative)
      - Future predictions (impossible aur funny)
      - Desi parents ke reactions
      - Career vs Love life comparison
      - Dating apps pe future
      - Social media couple goals analysis
      - Moving on ke liye savage advice
      - Friend zone vs relationship zone
      
      Make it sound like friends analyzing at midnight chai session. Use trending desi memes.
      Response should be 100% in Hinglish - no pure Hindi or English sentences.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
      if (audioRef.current) {
        audioRef.current.play();
      }
    } catch (error) {
      setResult('Error generating result. Lagta hai teri love life itni complicated hai ki AI bhi samajh nahi paa raha! 😂');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      py: { xs: 2, md: 4 },
      px: { xs: 1, md: 2 }
    }}>
      <audio ref={audioRef} src="/rip-love.mp3" />
      
      {loading && (
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
            Calculating Relationship Expiry Date... 🔮
          </Typography>
        </Box>
      )}
      
      <Container maxWidth="md">
        {/* Back Button */}
        <IconButton 
          onClick={() => navigate('/dashboard')}
          sx={{ 
            position: 'absolute',
            top: 20,
            left: 20,
            color: '#fff',
            background: 'rgba(255,23,68,0.1)',
            '&:hover': {
              background: 'rgba(255,23,68,0.2)'
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>

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
              textAlign: 'center'
            }}
          >
            <Typography variant="h3" sx={{ color: '#ff1744', fontWeight: 'bold' }}>
              Relationship Duration Quiz 💔
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff', mt: 1 }}>
              Kitne din chalega? AI batayega! 🔮
            </Typography>
          </Paper>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ 
              p: { xs: 2, md: 4 }, 
              background: 'rgba(26, 26, 26, 0.9)',
              borderRadius: 4,
              border: '1px solid rgba(255, 23, 68, 0.3)',
            }}>
              <Stepper 
                activeStep={activeStep} 
                sx={{ 
                  mb: { xs: 2, md: 4 },
                  display: { xs: 'none', sm: 'flex' }
                }}
              >
                {questions.map((_, index) => (
                  <Step key={index}>
                    <StepLabel></StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Mobile Progress Indicator */}
              <Box sx={{ 
                display: { xs: 'flex', sm: 'none' }, 
                justifyContent: 'center',
                mb: 2
              }}>
                <Typography sx={{ color: '#ff1744' }}>
                  Question {activeStep + 1} of {questions.length}
                </Typography>
              </Box>

              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#ff1744', 
                  mb: 3,
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                }}
              >
                {questions[activeStep].question}
              </Typography>

              <FormControl component="fieldset">
                <RadioGroup
                  value={answers[activeStep] || ''}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[activeStep] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                >
                  {questions[activeStep].options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={
                        <Typography sx={{ color: '#fff' }}>
                          {option}
                        </Typography>
                      }
                      sx={{ mb: 2 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{ color: '#ff1744', borderColor: '#ff1744' }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!answers[activeStep]}
                  sx={{ 
                    background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                    }
                  }}
                >
                  {activeStep === questions.length - 1 ? (
                    loading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size={24} sx={{ mr: 1 }} />
                        Calculating...
                      </Box>
                    ) : 'Finish'
                  ) : 'Next'}
                </Button>
              </Box>
            </Paper>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ 
              p: { xs: 2, md: 4 }, 
              background: 'rgba(26, 26, 26, 0.95)',
              borderRadius: 4,
              border: '2px solid #ff1744'
            }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Typography variant="h5" sx={{ color: '#ff1744', mb: 2 }}>
                    Prediction Result 🔮
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
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActiveStep(0);
                      setAnswers([]);
                      setResult('');
                    }}
                    sx={{ 
                      mt: 3,
                      background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
                      }
                    }}
                  >
                    Try Again
                  </Button>
                </>
              )}
            </Paper>
          </motion.div>
        )}

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
      </Container>
    </Box>
  );
};

export default RelationshipQuiz; 