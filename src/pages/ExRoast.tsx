import { useState, useRef } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button, 
  TextField,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { motion } from 'framer-motion';
import ImageIcon from '@mui/icons-material/Image';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const ExRoast = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const analyzeExPhoto = async () => {
    if (!selectedImage) {
      setResult('Photo toh upload kar bhai! 🤦‍♂️');
      return;
    }
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const prompt = `Analyze this ex's photo and create a super savage roast in pure Hinglish (no pure Hindi/English).
      ${customMessage ? `User ka message: ${customMessage}\n\n` : ''}

      Points to cover (all in Hinglish only):
      - First impression (funny but not mean)
      - Current life status predictions (creative and hilarious)
      - Future predictions (impossible aur funny)
      - Photo mein dikhe red flags (be creative)
      - Dating app bio suggestions (ekdum funny)
      - Social media life analysis
      - Career predictions (UPSC/government job references)
      - Relationship status predictions
      - Desi parents ke reactions
      - Moving on ke liye thoda advice (par entertaining)
      
      Make it sound like friends roasting at late night party. Use trending desi memes.
      Response should be 100% in Hinglish - no pure Hindi or English sentences.`;
      
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

  const generateAagLagaoMessage = async () => {
    if (!name) {
      setResult('Naam toh daal de bhai! 🤦‍♂️');
      return;
    }
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Create a super savage message in pure Hinglish (no pure Hindi/English).

      Points to cover (all in Hinglish only):
      - Desi parents ke taunts and reactions
      - Latest viral memes aur trending jokes
      - Social media aur relationship ke references
      - Career-related burns (UPSC/government job references)
      - Future predictions (impossible aur funny)
      - Red flags jo ignore kiye
      - Dating apps ki kahaniya
      - Moving on ke liye motivation (par funny)
      - Friend zone vs relationship zone comparison
      
      Make it sound like friends roasting at midnight. Use desi pop culture references.
      Response should be 100% in Hinglish - no pure Hindi or English sentences.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResult(response.text());
      if (audioRef.current) {
        audioRef.current.play();
      }
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
            {selectedImage ? 'Ex Ki Band Baja Rahe Hai... 🔥' : 'Aag Laga Rahe Hai... 🔥'}
          </Typography>
        </Box>
      )}
      
      <Container maxWidth="lg">
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
              Ex Roasting Section 🔥
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff', mt: 1 }}>
              Aaj ke menu mein: Ex ki band bajaana 😈
            </Typography>
          </Paper>
        </motion.div>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Ex Photo Reality Check */}
          <Grid item xs={12} sm={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedImage(file);
                      setResult('');
                    }
                  }}
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
                  <>
                    <Typography sx={{ mb: 2, color: '#fff' }}>
                      Selected: {selectedImage.name}
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Kuch Spicy Message Add Karna Hai? (Optional)"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
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
                  </>
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
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      <Typography>
                        Roast Generate Ho Raha Hai...
                      </Typography>
                    </Box>
                  ) : 'Reality Check Karo 🔍'}
                </Button>
              </Paper>
            </motion.div>
          </Grid>

          {/* Aag Lagao Message Generator */}
          <Grid item xs={12} sm={6}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setResult('');
                  }}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
                <Button 
                  variant="contained"
                  onClick={generateAagLagaoMessage}
                  disabled={loading || !name}
                  fullWidth
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
                      Aag Laga Rahe Hai...
                    </Box>
                  ) : 'Aag Lagao 🔥'}
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
                  p: { xs: 2, md: 4 }, 
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

export default ExRoast; 