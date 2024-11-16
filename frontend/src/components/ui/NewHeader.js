import React, { useState, useEffect, useContext } from "react";

import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  Tab,
  Tabs,
  SwipeableDrawer,
  Typography,
  Badge,
  Menu,
  MenuItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import {
  Toolbar,
  useScrollTrigger,
  ListItemText,
  InputBase,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
// import MenuIcon from '@material-ui/icons/Menu'
// import { ListItemText } from '@material-ui/core';
import SearchIcon from "@mui/icons-material/Search";
// import logo from "./../../assests/charpahiya.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { InputBase } from '@material-ui/core';

import {
  ExpandLess,
  ExpandMore,
  Favorite,
  LocalMall,
  StarBorder,
} from "@mui/icons-material";
// import SearchBox from '../SearchBox';
import Colors from "./Color";

import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../SearchBox";

import { logout } from "../../actions/userActions";
// import { Collapse } from "react-bootstrap";
import Collapse from "@mui/material/Collapse";
// import { auth } from '../../firebase'
// import { useHistory } from 'react-router';
// import HeaderV from './HeaderV';
// import { StateContext } from '../../context/StateContext';
import CommunityIcon from '@mui/icons-material/People'; 
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SellIcon from '@mui/icons-material/Sell';
import CompareIcon from '@mui/icons-material/Compare';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { 
  SiTata, 
  SiHonda, 
  SiHyundai, 
  SiToyota, 
  SiBmw, 
  SiMercedes, 
  SiVolkswagen, 
  SiSkoda 
} from 'react-icons/si';
import { FaCar } from 'react-icons/fa';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "2em",
    },
  },
  logoContainer: {
    marginLeft: "2em",
    marginRight: "2em",
    padding: "0.5em",
    "&:hover": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("md")]: {
      marginRight: "1em",
      marginLeft: "1em",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 0,
    },
  },
  logoText: {
    fontFamily: "Raleway",
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: Colors.orange,
    textTransform: "none",
    textDecoration: "none",
    letterSpacing: "1px",
    "&:hover": {
      color: Colors.orange
    }
  },
  tabContainer: {
    marginRight: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "50px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    // backgroundColor: Colors.BDark,
    backgroundColor: "rgb(34 43 69)",
    borderBottom: "#F037A5",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
      color: Colors.orange,
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
    color: Colors.white,
  },
  drawerIconContainer: {
    marginLeft: "auto",
    // backgroundColor:'red',
    // borderColor:'yellow',
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    // backgroundColor: "white",
    backgroundColor: "rgb(34 43 69)",
    borderBottom: "#F037A5",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
    width: "17em",
    // padding:'1%'
  },
  drawerItem: {
    ...theme.typography.tab,
    color: Colors.white,
    opacity: 1,
  },
  drawerItemEstimate: {
    backgroundColor: Colors.orange,
    "&:hover": {
      backgroundColor: Colors.orange,
    },
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: "rgb(34 43 69)",
    borderBottom: "#F037A5",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
    paddingRight: "5%",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  searchIcon: {
    padding: theme.spacing(0, 0.2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid black",
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  inputRoot: {
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  menu: {
    backgroundColor: "rgb(34 43 69)",
    marginTop: "2rem",
    borderRadius: "4px",
    border: `1px solid ${Colors.orange}`,
  },
  menuItem: {
    color: Colors.white,
    padding: "10px 20px",
    minWidth: "150px",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: Colors.orange
    },
    "& .MuiListItemIcon-root": {
      color: "inherit"
    }
  },
  menuIcon: {
    fontSize: "1.2rem",
    marginRight: theme.spacing(1)
  }
}));

export default function NewHeader(props) {
  const classes = useStyles();
  const theme = useTheme();
  // const history = useHistory('');
  const navigate = useNavigate();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  // const matches = useMediaQuery('(min-width:900px)');

  const [search, setSearch] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const [anchorE2, setAnchorE2] = useState(null);
  const [openMenu2, setOpenMenu2] = useState(false);

  const [anchorE3, setAnchorE3] = useState(null);
  const [openMenu3, setOpenMenu3] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [anchorElAdmin, setAnchorElAdmin] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminClick = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };


  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    handleClose();
    navigate('/');
  };

  const getWishlistsItem = useSelector((state) => state.getWishlistsItem);
  const { loading, error, wishItem } = getWishlistsItem;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // const {cart,wish} =useContext(StateContext);
  // const [dataCart] =  cart;
  // const [dataWishlist] = wish;

  const handelSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?name=${search}`);
    setSearch("");
  };
  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  // const handleChange = (e,newValue)=>{
  //     props.setValue(newValue);
  // }
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };

  const handleClick2 = (e) => {
    setAnchorE2(e.currentTarget);
    setOpenMenu2(true);
  };
  const handleClose2 = (e) => {
    setAnchorE2(null);
    setOpenMenu2(false);
  };

  const handleMenuItemClick2 = (e, i) => {
    setAnchorE2(null);
    setOpenMenu2(false);
    props.setSelectedIndex(i);
  };

  const handleClick3 = (e) => {
    setAnchorE3(e.currentTarget);
    setOpenMenu3(true);
  };
  const handleClose3 = (e) => {
    setAnchorE3(null);
    setOpenMenu3(false);
  };

  const handleMenuItemClick3 = (e, i) => {
    setAnchorE3(null);
    setOpenMenu3(false);
    props.setSelectedIndex(i);
  };

  const [opend, setOpend] = useState(false);

  const handleClickd = () => {
    setOpend(!opend);
  };

  const [openA, setOpenA] = useState(false);

  const handleClickA = () => {
    setOpenA(!openA);
  };
  const menuOptions = [
    {
      name: "Maruti Suzuki",
      link: `/category/Cars/Maruti Suzuki`,
      activeIndex: 1,
      selectedIndex: 0,
      icon: <FaCar />
    },
    {
      name: "Tata Motors",
      link: `/category/Cars/Tata Motors`,
      activeIndex: 1,
      selectedIndex: 1,
      icon: <SiTata />
    },
    {
      name: "Mahindra",
      link: `/category/Cars/Mahindra`,
      activeIndex: 1,
      selectedIndex: 2,
      icon: <FaCar />
    },
    {
      name: "Hyundai",
      link: `/category/Cars/Hyundai`,
      activeIndex: 1,
      selectedIndex: 3,
      icon: <SiHyundai />
    },
    {
      name: "Honda",
      link: `/category/Cars/Honda`,
      activeIndex: 1,
      selectedIndex: 4,
      icon: <SiHonda />
    },
    {
      name: "Toyota",
      link: `/category/Cars/Toyota`,
      activeIndex: 1,
      selectedIndex: 5,
      icon: <SiToyota />
    },
    {
      name: "Kia",
      link: `/category/Cars/Kia`,
      activeIndex: 1,
      selectedIndex: 6,
      icon: <FaCar />
    },
    {
      name: "MG",
      link: `/category/Cars/MG`,
      activeIndex: 1,
      selectedIndex: 7,
      icon: <FaCar />
    },
    {
      name: "Skoda",
      link: `/category/Cars/Skoda`,
      activeIndex: 1,
      selectedIndex: 8,
      icon: <SiSkoda />
    },
    {
      name: "Volkswagen",
      link: `/category/Cars/Volkswagen`,
      activeIndex: 1,
      selectedIndex: 9,
      icon: <SiVolkswagen />
    },
    {
      name: "BMW",
      link: `/category/Cars/BMW`,
      activeIndex: 1,
      selectedIndex: 10,
      icon: <SiBmw />
    },
    {
      name: "Mercedes",
      link: `/category/Cars/Mercedes`,
      activeIndex: 1,
      selectedIndex: 11,
      icon: <SiMercedes />
    }
  ];

  const adminOptions = [
    {
      name: "Users",
      link: "/admin/userlist",
      activeIndex: 7,
      selectedIndex: 0,
    },
    {
      name: "Products",
      link: "/admin/productlist",
      activeIndex: 7,
      selectedIndex: 1,
    },
    {
      name: "Coupon",
      link: "/admin/coupon",
      activeIndex: 7,
      selectedIndex: 2,
    },
    {
      name: "Orders",
      link: "/admin/orderlist",
      activeIndex: 7,
      selectedIndex: 3,
    },
  ];

  const handleListCarClick = () => {
    navigate('/admin/product/6736bd3c7f3f2093ebaec10a/edit');
  };

  const routes = [
    {
      name: "COMMUNITIES",
      link: "/communities",
      activeIndex: 1,
      icon: <CommunityIcon />
    },
    {
      name: "BUY CARS", 
      link: "/cars",
      activeIndex: 2,
      icon: <DirectionsCarIcon />
    },
    {
      name: "COMPARE CARS",
      link: "/compare",
      activeIndex: 3,
      icon: <CompareArrowsIcon />
    },
    {
      name: "LIST YOUR CAR",
      onClick: handleListCarClick,
      activeIndex: 4,
      icon: <SellIcon />
    },
    { 
      name: "ACCESSORIES",
      link: "/accessories",
      activeIndex: 5,
      icon: <LocalMall />
    }
  ];
  const routesH = [
    { name: "CARS", link: "/men", activeIndex: 0 },
    // {name:'Women',link:'/women',activeIndex:1,},
    // {name:'Mobile Cover',link:'/cover',activeIndex:2},
    // {name:'HOME',link:'/',activeIndex:9},
  ];

  // const routesV = [
  //   { name: "My Account", link: "/myaccount", activeIndex: 4 },
  //   { name: "My Order", link: "/myorders", activeIndex: 5 },
  //   { name: "My Wishlist", link: "/whistlist", activeIndex: 7 },
  //   { name: "Cart", link: "/cart", activeIndex: 8 },
  // ];
  useEffect(() => {
    [...menuOptions, ...adminOptions, ...routes, ...routesH].forEach(
      (route) => {
        switch (window.location.pathname) {
          case `${route.link}`:
            if (props.value !== route.activeIndex) {
              props.setValue(route.activeIndex);
              if (
                route.selectedIndex &&
                route.selectedIndex !== props.selectedIndex
              ) {
                props.setSelectedIndex(route.selectedIndex);
              }
            }
            break;
          case "/":
            props.setValue(0);
            break;
          case "/login":
            props.setValue(3);
            break;
          case "/cart":
            props.setValue(4);
            break;
          case "/wishlist":
            props.setValue(5);
            break;
          default:
            break;
        }
      }
    );
  });

  // Profile menu items
  const profileMenuItems = [
    { name: 'Profile', link: '/profile' },
    { name: 'Logout', onClick: logoutHandler }
  ];

  // Admin menu items
  const adminMenuItems = [
    { name: 'User List', link: '/admin/userlist' },
    { name: 'Product List', link: '/admin/productlist' },
    { name: 'Order List', link: '/admin/orderlist' }
  ];

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAdminMenuClose = () => {
    setAnchorElAdmin(null);
  };

  const tabs = (
    <React.Fragment>
      <Tabs
        className={classes.tabContainer}
        value={props.value}
        onChange={handleChange}
        indicatorColor="#FFB319"
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={route.link ? Link : 'button'}
            {...(route.link ? { to: route.link } : { onClick: route.onClick })}
            style={{ 
              color: Colors.white,
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
            label={
              <div style={{display: 'flex', alignItems: 'center'}}>
                {route.icon}
                <span style={{marginLeft: '8px'}}>{route.name}</span>
              </div>
            }
          />
        ))}
      </Tabs>
      <SearchBox />
      {userInfo && (
        <>
          <Button
            style={{ color: Colors.white }}
            onClick={handleProfileClick}
            endIcon={<ExpandMore />}
          >
            <AccountCircleIcon style={{ marginRight: '5px' }} />
            {userInfo.name}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            classes={{ paper: classes.menu }}
            elevation={0}
            keepMounted
          >
            {profileMenuItems.map((item, index) => (
              <MenuItem
                key={index}
                component={item.link ? Link : 'button'}
                to={item.link}
                onClick={item.onClick || handleProfileMenuClose}
                classes={{ root: classes.menuItem }}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>

          {userInfo.isAdmin && (
            <>
              <Button
                style={{ color: Colors.white }}
                onClick={handleAdminClick}
                endIcon={<ExpandMore />}
              >
                <AdminPanelSettingsIcon style={{ marginRight: '5px' }} />
                Admin
              </Button>
              <Menu
                anchorEl={anchorElAdmin}
                open={Boolean(anchorElAdmin)}
                onClose={handleAdminMenuClose}
                classes={{ paper: classes.menu }}
                elevation={0}
                keepMounted
              >
                {adminMenuItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={item.link}
                    onClick={handleAdminMenuClose}
                    classes={{ root: classes.menuItem }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </>
      )}
      <Button component={Link} to="/wishlist" onClick={() => props.setValue(5)}>
        <Favorite
          style={{ color: wishItem.length ? "#FF0000" : Colors.white }}
        />
      </Button>
      {userInfo && userInfo.isAdmin && (
        <Button
          aria-owns={anchorE3 ? "simple-menu3" : undefined}
          aria-haspopup={anchorE3 ? "true" : undefined}
          onMouseOver={(event) => handleClick3(event)}
          onClick={() => props.setValue(7)}
        >
          <AdminPanelSettingsIcon style={{ color: Colors.orange }} />
        </Button>
      )}
    </React.Fragment>
  );
  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <div style={{ marginLeft: "5%" }}>
          <SearchBox />
        </div>

        <List disablePadding>
          {routes.map((route, index) => (
            <ListItem
              key={index}
              button
              {...(route.link 
                ? { 
                    component: Link,
                    to: route.link
                  } 
                : { 
                    onClick: () => {
                      route.onClick();
                      setOpenDrawer(false);
                    }
                  }
              )}
              selected={props.value === route.activeIndex}
              onClick={() => {
                if (route.link) {
                  setOpenDrawer(false);
                  props.setValue(route.activeIndex);
                }
              }}
            >
              <ListItemIcon style={{color: Colors.white}}>
                {route.icon}
              </ListItemIcon>
              <ListItemText 
                disableTypography 
                className={classes.drawerItem}
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          {/* ))} */}
          <Collapse in={opend} timeout="auto" unmountOnExit>
            <List dense disablePadding>
              {menuOptions.map((item, index) => (
                <ListItem
                  key={index}
                  classes={{
                    root: classes.menuItem,
                    // selected: classes.drawerItemSelected,
                  }}
                  button
                  selected={index === props.selectedIndex && props.value === 1}
                  onClick={() => {
                    props.setValue(1);
                    // setMenuItemIndex(index);
                    setOpenDrawer(false);
                  }}
                  component={Link}
                  to={item.link}
                  // selected={props.value === item.activeIndex}
                >
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem
            //   key={`${route}${route.activeIndex}`}
            divider
            button
            component={Link}
            to="/accessories"
            //   component={Link}
            //   to={route.link}
            //   selected={props.value === route.activeIndex}
            classes={{ selected: classes.drawerItemSelected }}
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(2);
            }}
          >
            <ListItemText disableTypography className={classes.drawerItem}>
              ACCESSORIES
            </ListItemText>
          </ListItem>
          <ListItem
            //   key={`${route}${route.activeIndex}`}
            divider
            button
            component={Link}
            to="/wishlist"
            //   selected={props.value === route.activeIndex}
            classes={{ selected: classes.drawerItemSelected }}
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(5);
            }}
          >
            <ListItemText disableTypography className={classes.drawerItem}>
              Wishlist
            </ListItemText>
          </ListItem>
          {userInfo ? (
            <React.Fragment>
              {/* <ListItem>
                <ListItemText>
                  <Typography
                    variant="body1"
                    style={{ color: "rgba(0,0,0,.3)", fontWeight: 500 }}
                  >
                    My Profile
                  </Typography>
                </ListItemText>
              </ListItem> */}

              {/* {routesV.map((route) => ( */}
              <ListItem
                //   key={`${route}${route.activeIndex}`}
                divider
                button
                component={Link}
                to="/profile"
                //   selected={props.value === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                  props.setValue(6);
                }}
              >
                <ListItemText disableTypography className={classes.drawerItem}>
                  Profile
                </ListItemText>
              </ListItem>
              {/* ))} */}
              {userInfo && userInfo.isAdmin && (
                <ListItem
                  onClick={() => {
                    handleClickA();
                    props.setValue(7);
                  }}
                  //   key={`${route}${route.activeIndex}`}
                  divider
                  button
                  //   component={Link}
                  //   to={route.link}
                  //   selected={props.value === route.activeIndex}
                  classes={{ selected: classes.drawerItemSelected }}
                  // onClick={() => {
                  //   setOpenDrawer(false);
                  //   // props.setValue(route.activeIndex);
                  // }}
                >
                  <ListItemText
                    disableTypography
                    className={classes.drawerItem}
                  >
                    Admin
                  </ListItemText>
                  {openA ? (
                    <ExpandLess style={{ color: Colors.white }} />
                  ) : (
                    <ExpandMore style={{ color: Colors.white }} />
                  )}
                </ListItem>
              )}
              {/* ))} */}
              <Collapse in={openA} timeout="auto" unmountOnExit>
                <List dense disablePadding>
                  {adminOptions.map((item, index) => (
                    <ListItem
                      key={index}
                      classes={{
                        root: classes.menuItem,
                        // selected: classes.drawerItemSelected,
                      }}
                      button
                      selected={
                        index === props.selectedIndex && props.value === 7
                      }
                      onClick={() => {
                        props.setValue(7);
                        // setMenuItemIndex(index);
                        setOpenDrawer(false);
                      }}
                      component={Link}
                      to={item.link}
                      // selected={props.value === item.activeIndex}
                    >
                      <ListItemText>{item.name}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <ListItem
                divider
                button
                // component={Link}
                // to="/estimate"
                classes={{
                  root: classes.drawerItemEstimate,
                  selected: classes.drawerItemSelected,
                }}
                onClick={() => {
                  // auth.signOut()
                  logoutHandler();
                  setOpenDrawer(false);
                  props.setValue(9);
                }}
                selected={props.value === 9}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  Logout
                </ListItemText>
              </ListItem>
            </React.Fragment>
          ) : null}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        // disableRipple
        disableFocusRipple
        // edge
        // disableFocusRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              className={classes.logoContainer}
              component={Link}
              to="/"
              onClick={() => props.setValue(0)}
              disableRipple
            >
              <Typography className={classes.logoText}>
                Auto Compare
              </Typography>
            </Button>

            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
