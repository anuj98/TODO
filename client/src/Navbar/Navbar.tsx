import React, { useState } from "react";
import { Drawer, ListItemButton, ListItemIcon } from "@mui/material";
import * as Icons from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import "./Navbar.css";

export const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const collapsedPanelList = () => {
        return (
            <>
                <div className='hamburger-wrapper'><Icons.Menu /></div>
                <ListItemButton onClick={() => window.location.pathname = '/'}>
                    <ListItemIcon><Icons.Home /></ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={() => window.location.pathname = '/important'}>
                    <ListItemIcon><Icons.Star /></ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={() => window.location.pathname = '/overdue'}>
                    <ListItemIcon><Icons.CalendarToday /></ListItemIcon>
                </ListItemButton>
            </>
        )
    }

    const expandedPanelList = () => {
        return (
            <div style={{ width: 250 }}>
                <div className="hamburger-wrapper" onClick={() => setIsExpanded(false)}><Icons.Menu /></div>
                <ListItemButton onClick={() => window.location.pathname = '/'}>
                    <ListItemIcon><Icons.Home /></ListItemIcon>
                    <ListItemText primary="All Tasks" />
                </ListItemButton>
                <ListItemButton onClick={() => window.location.pathname = '/important'}>
                    <ListItemIcon><Icons.Star /></ListItemIcon>
                    <ListItemText primary="Important Tasks" />
                </ListItemButton>
                <ListItemButton onClick={() => window.location.pathname = '/overdue'}>
                    <ListItemIcon><Icons.CalendarToday /></ListItemIcon>
                    <ListItemText primary="Overdue Tasks" />
                </ListItemButton>
            </div>
        )
    }
    return (
        <>
            {isExpanded ? (
                <Drawer anchor="left" variant="permanent" open={isExpanded} className='drawer-style'>
                    {expandedPanelList()}
                </Drawer>
            ) : (
                <div className="collapsed-navbar" onClick={() => setIsExpanded(true)}>{collapsedPanelList()}</div>
            )}
        </>
    )
}