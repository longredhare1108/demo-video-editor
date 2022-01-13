import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CakeIcon from '@mui/icons-material/Cake';

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Classes" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Instructors" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Saved Classes" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <CelebrationIcon />
            </ListItemIcon>
            <ListItemText primary="Party" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <CakeIcon />
            </ListItemIcon>
            <ListItemText primary="Referral" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>More From RBOL</ListSubheader>
        <ListItem button>
            <ListItemText primary="Blog" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Facebook Group" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Contact Us" />
        </ListItem>
    </div>
);
