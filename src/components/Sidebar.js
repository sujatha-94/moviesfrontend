import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import ExploreIcon from '@mui/icons-material/Explore';
import AnimationIcon from '@mui/icons-material/Animation';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import StarIcon from '@mui/icons-material/Star';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HomeIcon from '@mui/icons-material/Home';
import BoltIcon from '@mui/icons-material/Bolt';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  { useState, useMemo } from 'react';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  position: 'relative',
}));

const NetflixTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textAlign: 'center',
  color: 'white',
  fontWeight: 'bold',
}));

const BoldButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
}));

const SearchResultsList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const MoviePoster = styled('img')(({ theme }) => ({
  width: '100px',
  height: '150px',
  objectFit: 'cover',
  marginRight: theme.spacing(2),
}));

export default function PersistentDrawerLeft({ onCategorySelect }) {

  const [open, setOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [createAccountOpen, setCreateAccountOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false); // Ensure this is defined
  const [email, setEmail] = React.useState('');
  const [accessGranted, setAccessGranted] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState('light');
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [isCreatingAccount, setIsCreatingAccount] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [themeMode, setThemeMode] = useState('light');


  const handleLoginOpen = () => {
    setLoginOpen(true);
    setIsCreatingAccount(false); // Reset to login view
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setUsername('');
    setPassword('');
    setIsCreatingAccount(false); // Reset to login view
  };

  const handleLogin = () => {
    const storedUser = localStorage.getItem(username);
    if (storedUser && storedUser === password) {
      setAccessGranted(true);
      alert('Login successful!');
      handleLoginClose();
    } else {
      alert('Invalid username or password');
    }
  };

  const handleCreateAccount = () => {
    if (localStorage.getItem(username)) {
      alert('Username already exists');
      return;
    }
    localStorage.setItem(username, password);
    alert('Account created successfully!');
    handleLoginClose();
  };

  const handleToggleAccountCreation = () => {
    setIsCreatingAccount(!isCreatingAccount);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCategoryClick = (category) => {
    if (category === 'Settings') {
      handleSettingsOpen();
    } else {
      onCategorySelect(category);
    }
  };
 

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeMode, // switch between light and dark mode
    },
  }), [themeMode]);

  // Function to toggle between light and dark themes
  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);
    setThemeMode(newTheme);
  };
  

  const handleNotificationsToggle = (event) => {
    const notificationsEnabled = event.target.checked;
    setNotificationsEnabled(notificationsEnabled);
    console.log(`Notifications: ${notificationsEnabled ? 'Enabled' : 'Disabled'}`);
    // Handle the notifications toggle logic here
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;

    setLoading(true);
    setSearchResults([]); // Clear the current search results

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: '9320f923d506550f84b0e5a4d4e6c97b', // Replace with your TMDb API key
          query: searchTerm,
          language: 'en-US',
          page: 1,
          include_adult: false,
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching movie results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
    
     
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#202124' }}>
        <ToolbarStyled>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
         
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search…"
            sx={{ backgroundColor: 'background.paper', width: 300 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              endAdornment: (
                <Button onClick={handleSearch} disabled={loading}>
                  
                </Button>
              ),
            }}
          />
          <NetflixTypography variant="h6" noWrap component="div">
            CineVerse
          </NetflixTypography>
          <Button color="inherit" onClick={handleLoginOpen}>
            {accessGranted ? 'Logout' : 'Login'}
          </Button>
        </ToolbarStyled>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: '#FFD700' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Popular', 'Top Rated', 'Upcoming'].map((text) => (
            <ListItem key={text} disablePadding sx={{ backgroundColor: '#202124', '&:hover': { backgroundColor: ': #F0F0F0' } }}>
              <ListItemButton onClick={() => handleCategoryClick(text)}>
                <ListItemIcon sx={{ color: '#FFD700' }}>
                  {text === 'Home' ? <HomeIcon /> :
                    text === 'Popular' ? <StarIcon /> :
                    text === 'Top Rated' ? <TrendingUpIcon /> :
                    text === 'Upcoming' ? <NewReleasesIcon /> :
                    null}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: '#FFFFFF' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Action', 'Comedy', 'Adventure', 'Animation', 'Horror', 'Thriller', 'Favourites', 'Settings'].map((text) => (
            <ListItem key={text} disablePadding sx={{ backgroundColor: '#202124', '&:hover': { backgroundColor: ': #F0F0F0' } }}>
              <ListItemButton onClick={() => handleCategoryClick(text)}>
                <ListItemIcon sx={{ color: '#FFD700' }}>
                  {text === 'Action' ? <SportsMotorsportsIcon /> :
                    text === 'Comedy' ? <EmojiEmotionsIcon /> :
                    text === 'Adventure' ? <ExploreIcon /> :
                    text === 'Animation' ? <AnimationIcon /> :
                    text === 'Horror' ? <LocalMoviesIcon /> :
                    text === 'Thriller' ? <BoltIcon /> :
                    text === 'Favourites' ? <FavoriteIcon /> :
                    text === 'Settings' ? <SettingsIcon /> :
                    null}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: '#FFFFFF' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
    
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <SearchResultsList>
              {searchResults.length > 0 ? (
                searchResults.map((movie) => (
                  <ListItem key={movie.id} sx={{ display: 'flex', alignItems: 'center' }}>
                    <MoviePoster
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <Box>
                      <ListItemText primary={movie.title} secondary={`Rating: ${movie.vote_average}`} />
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Typography></Typography>
              )}
            </SearchResultsList>
          )}
        </Box>
      </Main>

      {/* Login / Create Account Dialog */}
      <Dialog open={loginOpen} onClose={handleLoginClose}>
        <DialogTitle>{isCreatingAccount ? 'Create Account' : 'Login'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isCreatingAccount ? (
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Don't have an account?{' '}
              <Button onClick={handleToggleAccountCreation} color="primary">
                Create one
              </Button>
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Already have an account?{' '}
              <Button onClick={handleToggleAccountCreation} color="primary">
                Login
              </Button>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose}>Cancel</Button>
          <Button onClick={isCreatingAccount ? handleCreateAccount : handleLogin}>
            {isCreatingAccount ? 'Create Account' : 'Login'}
          </Button>
        </DialogActions>
      </Dialog>
    
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: 5,
          backgroundColor: themeMode === 'dark' ? '#202124' : '#FFFFFF', // Corrected the hex code
        }}
      >
        <List>
          <ListItem button onClick={handleSettingsOpen}>
            Settings
          </ListItem>
        </List>

        <Dialog 
          open={settingsOpen} 
          onClose={handleSettingsClose}
          PaperProps={{
            style: {
              width: '400px', // Set the desired width for the settings dialog
              maxWidth: 'none', // Disable the default max-width
            },
          }}
        >
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>
              Current Theme: {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} {/* Display theme name */}
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="theme-select-label"></InputLabel>
              <Select
                labelId="theme-select-label"
                id="theme-select"
                value={selectedTheme}
                onChange={handleThemeChange}
                sx={{ marginTop: '20px' }}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSettingsClose}>Cancel</Button>
            <Button onClick={handleSettingsClose}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
    </Box>
  );
}
