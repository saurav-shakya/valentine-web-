import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  Fade,
  IconButton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

interface EntryPageProps {
  setIsSingle: (value: boolean) => void;
}

const EntryPage = ({ setIsSingle }: EntryPageProps) => {
  const [open, setOpen] = useState(false);
  const [showSavageMessage, setShowSavageMessage] = useState(false);
  const [savageMessage, setSavageMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleResponse = (isSingle: boolean) => {
    setIsSingle(isSingle);
    setOpen(false);
    
    if (!isSingle) {
      const savageMessages = [
        "Oye Hoye! Relationship waala spotted! 👀\nNikal yaha se, jake apni Valentine ke saath reels bana! 📱",
        "Abe Committed! 🙄\nTere liye yaha kuch nahi hai, jake Oyo book kar! 🏨",
        "Beta Tumse Na Ho Payega! 😏\nTu committed hai? Tujhe kya zarurat hai yaha aane ki?\nJa, jake apni bae ko shopping karwa! 🛍️",
        "Bhai Bhai Bhai! 🤦‍♂️\nRelationship mein hai toh yaha kya kar raha hai?\nJake Instagram pe couple goals post kar! 📸",
        "Error 404: Singles Only! 🎮\nPlayer 2 already connected hai tera.\nYe single players ka server hai, nikal le bhai! 🚫"
      ];
      setSavageMessage(savageMessages[Math.floor(Math.random() * savageMessages.length)]);
      setShowSavageMessage(true);
      
      // Play savage sound effect
      const audio = new Audio('/rip-love.mp3');
      if (!isMuted) {
        audio.play();
      }
      
      setTimeout(() => {
        window.close();
      }, 5000);
    } else {
      // Play welcome sound
      const audio = new Audio('/welcome-single.mp3');
      if (!isMuted) {
        audio.play();
      }
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sound control */}
      <IconButton 
        onClick={() => setIsMuted(!isMuted)}
        sx={{ 
          position: 'absolute',
          top: 20,
          right: 20,
          color: '#fff',
          background: 'rgba(0,0,0,0.3)',
          '&:hover': {
            background: 'rgba(0,0,0,0.5)'
          }
        }}
      >
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>

      {/* Animated Background */}
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ 
            y: -20, 
            x: Math.random() * window.innerWidth,
            opacity: 0.3,
            rotate: 0
          }}
          animate={{ 
            y: window.innerHeight + 20,
            opacity: 0,
            rotate: 360
          }}
          transition={{ 
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            position: 'absolute',
            fontSize: Math.random() * 30 + 10,
            zIndex: 1
          }}
        >
          {['💔', '😭', '🚫', '💀', '😂', '🤡', '🎭'][Math.floor(Math.random() * 7)]}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <Paper
          elevation={24}
          sx={{
            p: 4,
            textAlign: 'center',
            background: 'rgba(26, 26, 26, 0.95)',
            borderRadius: 4,
            border: '2px solid rgba(255, 23, 68, 0.5)',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(255, 23, 68, 0.3)',
          }}
        >
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
          >
            <HeartBrokenIcon sx={{ fontSize: 100, color: '#ff1744' }} />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="h2" sx={{ mb: 2, color: '#fff', fontWeight: 'bold' }}>
              VALENTINE'S
            </Typography>
            <Typography variant="h1" sx={{ mb: 2, color: '#ff1744', fontWeight: 'bold' }}>
              DESTRUCTION
            </Typography>
            <Typography variant="h3" sx={{ color: '#fff', fontWeight: 'bold' }}>
              2025 💔
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
              <LocalFireDepartmentIcon sx={{ color: '#ff1744', fontSize: 40 }} />
              <Typography variant="h4" sx={{ color: '#fff' }}>
                Savage Mode: ON 🔥
              </Typography>
              <LocalFireDepartmentIcon sx={{ color: '#ff1744', fontSize: 40 }} />
            </Box>
          </motion.div>
        </Paper>
      </motion.div>

      <Dialog
        open={open}
        onClose={() => {}}
        PaperProps={{
          sx: {
            background: '#1a1a1a',
            color: '#fff',
            minWidth: '350px',
            border: '2px solid #ff1744',
            borderRadius: 4,
            boxShadow: '0 0 20px rgba(255, 23, 68, 0.3)',
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={500}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          color: '#ff1744', 
          fontWeight: 'bold',
          fontSize: '1.8rem',
          borderBottom: '1px solid rgba(255, 23, 68, 0.3)',
          pb: 2
        }}>
          "SINGLE?" 😈
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
            Tera Valentine hai? 🤔
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
            Soch ke jawab de, ek baar enter karne ke baad exit nahi kar payega! ⚠️
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => handleResponse(false)}
            sx={{ 
              py: 1.5,
              px: 4,
              background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
              },
              fontSize: '1.1rem'
            }}
          >
            Haan 💑
          </Button>
          <Button 
            variant="contained" 
            onClick={() => handleResponse(true)}
            sx={{ 
              py: 1.5,
              px: 4,
              background: 'linear-gradient(45deg, #f50057 30%, #ff1744 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #ff1744 30%, #f50057 90%)',
              },
              fontSize: '1.1rem'
            }}
          >
            Nahi 💔
          </Button>
        </DialogActions>
      </Dialog>

      <AnimatePresence>
        {showSavageMessage && (
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              width: '90%',
              maxWidth: '600px'
            }}
          >
            <Paper
              sx={{
                p: 4,
                background: 'rgba(26, 26, 26, 0.95)',
                border: '2px solid #ff1744',
                borderRadius: 4,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(255, 23, 68, 0.3)',
              }}
            >
              <Typography variant="h4" sx={{ color: '#ff1744', textAlign: 'center', mb: 2 }}>
                SYSTEM ALERT! 🚨
              </Typography>
              <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center', whiteSpace: 'pre-line' }}>
                {savageMessage}
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', mt: 2 }}>
                Window automatically band ho rahi hai... 5 seconds mein nikal ja! ⏳
              </Typography>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          py: 2,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255,23,68,0.3)',
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

export default EntryPage; 