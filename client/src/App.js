import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  TextField,
  useTheme,
  ThemeProvider,
  createTheme
} from '@mui/material';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import SearchIcon from '@mui/icons-material/Search';
import DevicesIcon from '@mui/icons-material/Devices';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios.post('/api/contact', {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
      });
      alert('Message envoyé avec succès!');
      event.target.reset();
    } catch (error) {
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/* Hero Section */}
        <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" gutterBottom align="center">
              Boostez Votre Clientèle avec une Landing Page Professionnelle
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom align="center">
              Attirez Plus de Clients pour Vos Services d'Installation de Bornes IRVE
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button variant="contained" color="secondary" size="large">
                Commencer Maintenant
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Benefits Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Avantages d'une Landing Page Dédiée
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <SearchIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Visibilité Accrue
                  </Typography>
                  <Typography>
                    Améliorez votre présence en ligne pour atteindre un public plus large.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <ElectricCarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Génération de Leads
                  </Typography>
                  <Typography>
                    Convertissez les visiteurs en clients potentiels grâce à un contenu ciblé.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <DevicesIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" component="h3" gutterBottom>
                    Image Professionnelle
                  </Typography>
                  <Typography>
                    Établissez votre crédibilité avec un design moderne et convivial.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Services Section */}
        <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
              Nos Services
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: 'Design Personnalisé',
                  description: 'Adapté pour refléter votre marque et vos services.',
                  icon: <DevicesIcon />
                },
                {
                  title: 'Optimisation SEO',
                  description: 'Améliorez votre classement dans les moteurs de recherche.',
                  icon: <SearchIcon />
                },
                {
                  title: 'Intégration Analytics',
                  description: 'Suivez le comportement des visiteurs pour affiner vos stratégies.',
                  icon: <AnalyticsIcon />
                }
              ].map((service, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>
                        {service.icon}
                      </Box>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {service.title}
                      </Typography>
                      <Typography>
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Contact Form */}
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
            Contactez-Nous
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  name="name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Téléphone"
                  name="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Envoyer le Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
