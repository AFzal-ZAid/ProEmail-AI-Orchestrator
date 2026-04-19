import React, { useState } from "react";
import {
  Container, TextField, Typography, Box, FormControl, MenuItem,
  CircularProgress, Button, Paper, Select, Grid, Card, 
  CardContent, Divider, IconButton, Skeleton, Fade
} from "@mui/material";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from "axios";

// Theme constants
const themeColors = {
  primaryTeal: "#00C2CB",
  darkText: "#1A1A1A",
  lightText: "#6B7280",
  glassBg: "rgba(255, 255, 255, 0.9)"
};

function App() {
  // UI State
  const [activeSection, setActiveSection] = useState("Home");
  const [showLogin, setShowLogin] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Logic State
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generateReply, setGenerateReply] = useState("");
  const [loading, setLoading] = useState(false);

  // API Call
  const handleSubmit = async () => {
    setLoading(true);
    setGenerateReply(""); 
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", { 
        emailContent, 
        tone 
      });
      const data = typeof response.data === "string" ? response.data : JSON.stringify(response.data);
      setGenerateReply(data);
    } catch (err) {
      setGenerateReply("Error: Could not connect to the server. Make sure your backend is running on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  // Clipboard Logic
  const handleCopy = () => {
    navigator.clipboard.writeText(generateReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Sub-Components ---

  const LoginModal = () => (
    <Fade in={showLogin}>
      <Box sx={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        bgcolor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
      }}>
        <Paper sx={{ p: 4, borderRadius: '24px', width: '90%', maxWidth: '400px', position: 'relative' }}>
          <IconButton onClick={() => setShowLogin(false)} sx={{ position: 'absolute', right: 12, top: 12 }}><CloseIcon /></IconButton>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Welcome Back</Typography>
          <Typography variant="body2" sx={{ color: themeColors.lightText, mb: 3 }}>Login to save your AI generations.</Typography>
          <TextField fullWidth label="Email Address" variant="outlined" sx={{ mb: 2 }} />
          <TextField fullWidth label="Password" type="password" variant="outlined" sx={{ mb: 3 }} />
          <Button fullWidth variant="contained" sx={{ bgcolor: themeColors.primaryTeal, py: 1.5, borderRadius: '12px', fontWeight: 'bold', '&:hover': { bgcolor: "#00acb5" } }} onClick={() => setShowLogin(false)}>
            Sign In
          </Button>
        </Paper>
      </Box>
    </Fade>
  );

  const Footer = () => (
    <Box sx={{ 
      bgcolor: "#fff", 
      pt: 10, 
      pb: 4, 
      borderTop: "1px solid #e5e7eb", 
      mt: "auto" 
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ justifyContent: "space-between" }}>
          
          {/* Column 1: Brand & Newsletter */}
          <Grid item="true" xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <MarkEmailReadIcon sx={{ color: themeColors.primaryTeal, fontSize: '2rem' }} />
              <Typography variant="h5" sx={{ fontWeight: 900, color: themeColors.darkText }}>
                ProEmail <Box component="span" sx={{ color: themeColors.primaryTeal }}>AI</Box>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: themeColors.lightText, mb: 3, lineHeight: 1.7, maxWidth: 300 }}>
              Join 10,000+ executives optimizing their daily workflow with high-stakes AI orchestration.
            </Typography>
            
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Get product updates</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField 
                size="small" 
                placeholder="Work email" 
                sx={{ 
                  bgcolor: "#f9fafb", 
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" } 
                }} 
              />
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: themeColors.darkText, 
                  textTransform: 'none', 
                  px: 3,
                  borderRadius: "8px",
                  '&:hover': { bgcolor: themeColors.primaryTeal }
                }}
              >
                Join
              </Button>
            </Box>
          </Grid>

          {/* Column 2: Product Links */}
          <Grid item="true" xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>Platform</Typography>
            {['Features', 'Tone Analytics', 'Bulk Processing', 'Enterprise Security'].map((text) => (
              <Typography key={text} variant="body2" sx={{ 
                color: themeColors.lightText, 
                mb: 2, 
                cursor: 'pointer', 
                transition: "0.2s",
                '&:hover': { color: themeColors.primaryTeal, transform: "translateX(5px)" } 
              }}>
                {text}
              </Typography>
            ))}
          </Grid>

          {/* Column 3: Resources */}
          <Grid item="true" xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>Resources</Typography>
            {['Documentation', 'API Reference', 'Pricing', 'Community'].map((text) => (
              <Typography key={text} variant="body2" sx={{ 
                color: themeColors.lightText, 
                mb: 2, 
                cursor: 'pointer', 
                transition: "0.2s",
                '&:hover': { color: themeColors.primaryTeal, transform: "translateX(5px)" } 
              }}>
                {text}
              </Typography>
            ))}
          </Grid>

          {/* Column 4: Trust & Social */}
          <Grid item="true" xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>Trust & Safety</Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, borderRadius: '12px', bgcolor: '#f0fdf4', border: '1px solid #dcfce7', mb: 3 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#22c55e' }} />
              <Typography variant="body2" sx={{ color: '#166534', fontWeight: 600 }}>
                All Systems Operational
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton 
                component="a" 
                href="https://www.linkedin.com/in/afzalzaid/" 
                target="_blank" 
                rel="noopener noreferrer"
                size="small" 
                sx={{ bgcolor: "#f3f4f6", '&:hover': { color: themeColors.primaryTeal } }}
              >
                <LinkedInIcon />
              </IconButton>

              <IconButton 
                component="a" 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                size="small" 
                sx={{ bgcolor: "#f3f4f6", '&:hover': { color: themeColors.primaryTeal } }}
              >
                <TwitterIcon />
              </IconButton>

              <IconButton 
                component="a" 
                href="https://github.com/AFzal-ZAid" 
                target="_blank" 
                rel="noopener noreferrer"
                size="small" 
                sx={{ bgcolor: "#f3f4f6", '&:hover': { color: themeColors.primaryTeal } }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, opacity: 0.5 }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: themeColors.lightText }}>
            © 2026 ProEmail AI Orchestrator. Crafted for professionals.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Privacy Policy', 'Terms of Service'].map((text) => (
              <Typography key={text} variant="caption" sx={{ color: themeColors.lightText, cursor: 'pointer', '&:hover': { color: themeColors.darkText } }}>
                {text}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
    }}>
      {showLogin && <LoginModal />}

      <Container maxWidth="lg" sx={{ flex: 1, pb: 8 }}>
        {/* NAVBAR */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 4, mb: 4 }}>
          <Box onClick={() => setActiveSection("Home")} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
            <MarkEmailReadIcon sx={{ color: themeColors.primaryTeal, fontSize: '2rem' }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: themeColors.darkText }}>
              ProEmail <Box component="span" sx={{ color: themeColors.primaryTeal, ml: 0.1 }}>AI Orchestrator</Box>
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {["Home", "About us", "Features", "Pricing"].map((item) => (
              <Typography 
                key={item} 
                onClick={() => setActiveSection(item)}
                sx={{ 
                  color: activeSection === item ? themeColors.primaryTeal : themeColors.lightText, 
                  fontWeight: 600, cursor: "pointer", transition: "0.2s",
                  '&:hover': { color: themeColors.primaryTeal }
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          <Button 
            variant="contained" 
            onClick={() => setShowLogin(true)}
            sx={{ bgcolor: themeColors.primaryTeal, borderRadius: "50px", px: 4, textTransform: "none", fontWeight: "bold", '&:hover': { bgcolor: "#00acb5" } }}
          >
            Log In
          </Button>
        </Box>

        {/* SECTION CONTENT */}
        {activeSection === "Home" && (
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, mt: 4 }}>
            <Box sx={{ flex: 1, minWidth: "300px" }}>
              <Typography variant="h2" sx={{ fontWeight: 800, color: themeColors.darkText, lineHeight: 1.1, mb: 3 }}>
                Orchestrate smart <br /> email replies at the <br /> 
                <Box component="span" sx={{ color: themeColors.primaryTeal }}>click of a button</Box>
              </Typography>
              <Typography sx={{ color: themeColors.lightText, mb: 4, maxWidth: "450px", fontSize: "1.1rem" }}>
                The professional AI assistant for high-stakes communication. Save time and stay productive with ProEmail.
              </Typography>

              <Paper elevation={0} sx={{ p: 3, borderRadius: "24px", border: "1px solid #e5e7eb" }}>
                <TextField
                  fullWidth multiline rows={4}
                  placeholder="Paste the email you received here..."
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <FormControl size="small" sx={{ minWidth: 140 }}>
                    <Select
                      value={tone}
                      displayEmpty
                      onChange={(e) => setTone(e.target.value)}
                      sx={{ borderRadius: "12px" }}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value=""><em>Email Tone</em></MenuItem>
                      <MenuItem value="professional">Professional</MenuItem>
                      <MenuItem value="friendly">Friendly</MenuItem>
                      <MenuItem value="urgent">Casual</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={!emailContent || loading}
                    sx={{ bgcolor: themeColors.primaryTeal, borderRadius: "12px", py: 1.5, fontWeight: "bold", '&:hover': { bgcolor: "#00acb5" } }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Reply"}
                  </Button>
                </Box>
              </Paper>
            </Box>

            <Box sx={{ flex: 1, minWidth: "300px", position: "relative" }}>
              <Box sx={{ position: "absolute", width: "100%", height: "100%", bgcolor: themeColors.primaryTeal, borderRadius: "40px", transform: "rotate(-3deg)", zIndex: 0 }} />
              <Paper elevation={10} sx={{ p: 4, borderRadius: "32px", zIndex: 1, minHeight: "400px", display: "flex", flexDirection: "column", position: 'relative' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  {loading ? "AI is orchestrating..." : "Generated Output"}
                </Typography>
                <Box sx={{ flex: 1 }}>
                  {loading ? (
                    <Box sx={{ mt: 2 }}>
                      <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 1 }} />
                      <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 1 }} />
                      <Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%' }} />
                    </Box>
                  ) : generateReply ? (
                    <Typography sx={{ color: themeColors.lightText, whiteSpace: "pre-line" }}>{generateReply}</Typography>
                  ) : (
                    <Box sx={{ textAlign: 'center', mt: 10, opacity: 0.4 }}>
                      <Typography>Your AI response will appear here.</Typography>
                    </Box>
                  )}
                </Box>
                {generateReply && !loading && (
                  <Button 
                    variant="outlined" 
                    startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
                    onClick={handleCopy}
                    sx={{ mt: 3, borderRadius: '12px', borderColor: themeColors.primaryTeal, color: themeColors.primaryTeal }}
                  >
                    {copied ? "Copied!" : "Copy Final Draft"}
                  </Button>
                )}
              </Paper>
            </Box>
          </Box>
        )}

        {/* FEATURES SECTION */}
        {activeSection === "Features" && (
          <Box sx={{ py: 4 }}>
            <Typography variant="h3" textAlign="center" fontWeight={800} mb={6}>Enterprise Features</Typography>
            <Grid container spacing={4}>
              {[
                { title: "Smart Context", desc: "Our AI understands the complex history of email threads." },
                { title: "Dynamic Tones", desc: "Switch between professional and urgent styles instantly." },
                { title: "Secure Deployment", desc: "Your data remains encrypted and private." }
              ].map((f, i) => (
                <Grid item="true" xs={12} md={4} key={i}>
                  <Card sx={{ borderRadius: '24px', p: 2, height: '90%' }}>
                    <CardContent>
                      <Typography variant="h6" color={themeColors.primaryTeal} fontWeight="bold" gutterBottom>{f.title}</Typography>
                      <Typography color="textSecondary">{f.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* PRICING SECTION */}
        {activeSection === "Pricing" && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={800} mb={6}>Scalable Pricing</Typography>
            <Grid container spacing={4} sx={{ justifyContent: "center" }}>
              {[
                { plan: "Personal", price: "$0", features: ["10 orchestrations/mo"] },
                { plan: "Professional", price: "$19", features: ["Unlimited access"] },
                { plan: "Enterprise", price: "$49", features: ["Team dashboard"] }
              ].map((p, i) => (
                <Grid item="true" xs={12} md={3} key={i}>
                  <Paper sx={{ p: 4, borderRadius: '24px', border: p.plan === "Professional" ? `2px solid ${themeColors.primaryTeal}` : 'none' }}>
                    <Typography variant="h5" fontWeight="bold">{p.plan}</Typography>
                    <Typography variant="h4" sx={{ my: 2, color: themeColors.primaryTeal }}>{p.price}</Typography>
                    <Divider sx={{ my: 2 }} />
                    {p.features.map(feat => <Typography key={feat} sx={{ mb: 1, fontSize: '0.9rem' }}>{feat}</Typography>)}
                    <Button fullWidth variant="contained" sx={{ mt: 3, borderRadius: '10px', bgcolor: p.plan === "Professional" ? themeColors.primaryTeal : '#333', '&:hover': { bgcolor: p.plan === "Professional" ? "#00acb5" : "#444" } }}>Select Plan</Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* ABOUT SECTION */}
        {activeSection === "About us" && (
          <Box sx={{ py: 8, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            <Typography variant="h3" fontWeight={800} mb={4}>Our Mission</Typography>
            <Typography variant="h6" sx={{ color: themeColors.lightText, lineHeight: 1.8 }}>
              At ProEmail AI Orchestrator, we believe professional communication should be seamless. 
              Our tool helps professionals manage digital communication with precision.
            </Typography>
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
}

export default App;