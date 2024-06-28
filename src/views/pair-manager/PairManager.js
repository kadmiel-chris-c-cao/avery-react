import React, { useState } from 'react';
import {
    Container, Grid, Typography, TextField, MenuItem, Button, Modal, Box, Card,
    Select, FormControl, InputLabel, Tabs, Tab, Table, Paper, TableContainer,
    TableHead, TableRow, TableBody, TableCell, useTheme,
} from '@mui/material';
// Import bird images
import lbird1 from 'src/assets/images/birdpics/LOVE BIRDS/Fischer\'s lovebird.jpg';
import lbird2 from 'src/assets/images/birdpics/LOVE BIRDS/Rosy-faced lovebird.jpg';
import lbird3 from 'src/assets/images/birdpics/LOVE BIRDS/Yellow-collared lovebird.jpg';
import lbird4 from 'src/assets/images/birdpics/LOVE BIRDS/Lilian\'s lovebird.jpg';
import sbird1 from 'src/assets/images/birdpics/SONG BIRDS/blackcap.jpg';
import sbird2 from 'src/assets/images/birdpics/SONG BIRDS/gray catbird.jpg';
import BirdCard from './component/BirdCard';

<BirdCard />

const AddPairModal = ({ birds, isOpen, onClose, onAddPair }) => {
    const [selectedMale, setSelectedMale] = useState('');
    const [selectedFemale, setSelectedFemale] = useState('');
    const [selectedNest, setSelectedNest] = useState(''); // Define selectedNest state
    const [selectedDateOfBeginning, setSelectedDateOfBeginning] = useState(''); // Define selectedDateOfBeginning state
    // Separate female and male birds
    const femaleBirds = birds.filter(bird => bird.sex === 'Female');
    const maleBirds = birds.filter(bird => bird.sex === 'Male');

    const handleSelectMale = (bird) => {
        setSelectedMale(bird);
    };

    const handleSelectFemale = (bird) => {
        setSelectedFemale(bird);
    };

    const handleAddPair = () => {
        onAddPair(selectedMale, selectedFemale, selectedNest, selectedDateOfBeginning);
        setSelectedMale('');
        setSelectedFemale('');
        setSelectedNest('');
        setSelectedDateOfBeginning('');
        onClose();
    };

    const isButtonDisabled = !(selectedMale && selectedFemale);

    // ADD PAIR MODAL //
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                width: '90%', // Adjusted width for responsiveness
                maxWidth: 500, // Maximum width to maintain readability
                bgcolor: 'background.paper',
                //border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Pair
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Select Male and Female Birds:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}> {/* Changed flexDirection to column for mobile view */}

                    {/* Female Birds */}
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel id="female-bird-label" sx={{ top: '-5px' }}>Select Female Bird</InputLabel>
                        <Select
                            labelId="female-bird-label"
                            id="female-bird-select"
                            value={selectedFemale}
                            onChange={(event) => handleSelectFemale(event.target.value)}
                        >
                            {femaleBirds.map((bird) => (
                                <MenuItem key={bird.id} value={bird}>
                                    {bird.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Male Birds */}
                    <FormControl fullWidth sx={{ mt: 3 }}>
                        <InputLabel id="male-bird-label" sx={{ top: '-5px' }}>Select Male Bird</InputLabel>
                        <Select
                            labelId="male-bird-label"
                            id="male-bird-select"
                            value={selectedMale}
                            onChange={(event) => handleSelectMale(event.target.value)}
                        >
                            {maleBirds.map((bird) => (
                                <MenuItem key={bird.id} value={bird}>
                                    {bird.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Nest */}
                    <FormControl fullWidth sx={{ mt: 3 }}>
                        <TextField
                            id="nest"
                            label="Nest"
                            variant="outlined"
                            value={selectedNest}
                            onChange={(e) => setSelectedNest(e.target.value)}
                            sx={{ top: '-5px' }}
                        />
                    </FormControl>

                    {/* Date of Begining */}
                    <FormControl fullWidth sx={{ mt: 3 }}>
                        <TextField
                            id="dateOfBeginning"
                            //label="Date of Beginning"
                            type="date"
                            variant="outlined"
                            value={selectedDateOfBeginning}
                            onChange={(e) => setSelectedDateOfBeginning(e.target.value)}
                        />
                    </FormControl>
                </Box>

                <Button
                    onClick={handleAddPair}
                    variant="contained"
                    sx={{ mt: 2 }}
                    disabled={isButtonDisabled}
                    style={{ backgroundColor: isButtonDisabled ? '#9e9e9e' : '#1565c0' }}
                    onMouseOver={(event) => event.target.style.backgroundColor = isButtonDisabled ? '#9e9e9e' : '#607d8b'}
                    onMouseOut={(event) => event.target.style.backgroundColor = isButtonDisabled ? '#9e9e9e' : '#1565c0'}
                >
                    Add Pair
                </Button>
            </Box>
        </Modal>
    );


};

const PairManager = () => {
    const [selectedCage, setSelectedCage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const [tabValue, setTabValue] = useState(0); // State for active tab

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const CustomTabPanel = ({ children, value, index, ...other }) => {
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    };

    // DEFAULT BIRD VIEW PAIR //
    const [pairs, setPairs] = useState([
        {
            male: {
                id: 1,
                name: "Fischer's lovebird",
                bandnumber: '123',
                sex: 'Male',
                cageNumber: 'Cage 1',
                dateOfBanding: '2022-01-01',
                dateOfBirth: '2021-01-01',
                status: 'Active',
                originDescription: 'Native to South America',
                genetics: 'Some genetic information',
                imageUrl: lbird1,
                additionalInfo: 'Additional notes about the bird.',
                color: 'rgba(181, 234, 234, 0.3)',
            },
            female: {
                id: 2,
                name: "African Grey Parrot",
                bandnumber: '456',
                sex: 'Female',
                cageNumber: 'Cage 1',
                dateOfBanding: '2022-02-01',
                dateOfBirth: '2021-02-01',
                status: 'Dead',
                originDescription: 'Native to Central Africa',
                genetics: 'Some genetic information',
                imageUrl: lbird2,
                additionalInfo: 'Additional notes about the bird.',
                color: 'rgba(255, 188, 188, 0.3)',
            },
            nest: "Default Nest",
            dateOfBeginning: "2024-03025",
        },


    ]);

    // the birds library
    const birds = [
        {
            id: 1,
            name: "Fischer's lovebird",
            bandnumber: '123',
            sex: 'Male',
            cageNumber: 'Cage 1',
            dateOfBanding: '2022-01-01',
            dateOfBirth: '2021-01-01',
            status: 'Active',
            originDescription: 'Native to South America',
            genetics: 'Some genetic information',
            imageUrl: lbird1,
            additionalInfo: 'Additional notes about the bird.',
            color: 'rgba(181, 234, 234, 0.3)',
        },
        {
            id: 2,
            name: "African Grey Parrot",
            bandnumber: '456',
            sex: 'Female',
            cageNumber: 'Cage 1',
            dateOfBanding: '2022-02-01',
            dateOfBirth: '2021-02-01',
            status: 'Active',
            originDescription: 'Native to Central Africa',
            genetics: 'Some genetic information',
            imageUrl: lbird2,
            additionalInfo: 'Additional notes about the bird.',
            color: 'rgba(255, 188, 188, 0.3)',
        },
        {
            id: 3,
            name: "Budgerigar",
            bandnumber: '789',
            sex: 'Male',
            cageNumber: 'Cage 2',
            dateOfBanding: '2022-03-01',
            dateOfBirth: '2021-03-01',
            status: 'Active',
            originDescription: 'Native to Australia',
            genetics: 'Some genetic information',
            imageUrl: lbird3,
            additionalInfo: 'Additional notes about the bird.',
            color: 'rgba(181, 234, 234, 0.2)',
        },
        {
            id: 4,
            name: "Scarlet Macaw",
            bandnumber: '101',
            sex: 'Male',
            cageNumber: 'Cage 2',
            dateOfBanding: '2022-04-01',
            dateOfBirth: '2021-04-01',
            status: 'Active',
            originDescription: 'Native to South America',
            genetics: 'Some genetic information',
            imageUrl: lbird4,
            additionalInfo: 'Additional notes about the bird.',
            color: 'rgba(181, 234, 234, 0.2)',
        },
        {
            id: 5,
            name: "Cockatiel",
            bandnumber: '202',
            sex: 'Female',
            cageNumber: 'Cage 3',
            dateOfBanding: '2022-05-01',
            dateOfBirth: '2021-05-01',
            status: 'Active',
            originDescription: 'Native to Australia',
            genetics: 'Some genetic information',
            imageUrl: sbird1,
            additionalInfo: 'Additional notes about the bird.',
            color: 'rgba(255, 188, 188, 0.2)',
        },
        {
            id: 6,
            name: "Amazon Parrot",
            bandnumber: '303',
            sex: 'Male',
            cageNumber: 'Cage 4',
            dateOfBanding: '2022-06-01',
            dateOfBirth: '2021-06-01',
            status: 'Active',
            originDescription: 'Native to South America',
            genetics: 'Some genetic information',
            imageUrl: sbird2,
            additionalInfo: 'Additional notes about the bird.',
            color: 'rgba(181, 234, 234, 0.2)',
        },
        // Add more birds
    ];

    const handleChange = (event) => {
        setSelectedCage(event.target.value);
        // Fetch birds based on selected cage and setBirds
    };

    const pairsInRows = pairs.reduce((rows, pair, index) => {
        const rowNum = Math.floor(index / 3); // Change this to 3 for three pairs per row
        if (!rows[rowNum]) {
            rows[rowNum] = [];
        }
        rows[rowNum].push(pair);
        return rows;
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddPair = (male, female, nest, dateOfBeginning) => {
        const newPair = { male, female, nest, dateOfBeginning };
        setPairs([...pairs, newPair]);
    };

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <TextField
                select
                label="Select Cage Number"
                value={selectedCage}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="1">Cage 1</MenuItem>
                {/* Add more menu items for other cage numbers */}
            </TextField>
            <Button onClick={handleOpenModal} variant="contained" sx={{ mb: 0 }}>Add Pair</Button>


            <Grid container sx={{ mt: 2 }}>
                {pairsInRows.map((row, rowIndex) => (
                    <Grid container item xs={12} key={rowIndex} spacing={2}> {/* Added spacing={2} */}
                        {row.map((pair, pairIndex) => (
                            <Grid item xs={12} sm={4} key={pairIndex}>
                                <Card sx={{
                                    marginTop: "12px",
                                    backgroundColor: theme.palette.mode === 'dark' ? '#1C465D' : '#F5FCFF',
                                    borderRadius: 2,
                                }}>
                                    <Grid container spacing={1.5}>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <BirdCard bird={pair.male} index={pairIndex * 2} nest={pair.nest} dateOfBeginning={pair.dateOfBeginning} color={pair.male.color} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <BirdCard bird={pair.female} index={pairIndex * 2 + 1} nest={pair.nest} dateOfBeginning={pair.dateOfBeginning} color={pair.female.color} />
                                        </Grid>
                                    </Grid>

                                    <Grid item maxWidth="sm" pt={3}>
                                        <Grid container justifyContent="center">
                                            <Box sx={{
                                                width: '100%',
                                                borderBottom: 1,
                                                borderColor: 'divider',
                                                backgroundColor: isDarkMode ? theme.palette.background.default : theme.palette.background.paper,
                                            }}>
                                                <Tabs
                                                    value={tabValue}
                                                    onChange={handleTabChange}
                                                    aria-label="bird-pair-tabs"
                                                    variant="scrollable"
                                                    scrollButtons="auto"
                                                    sx={{
                                                        minHeight: 'unset',
                                                        '& .MuiTab-root': {
                                                            minWidth: 'auto',
                                                            fontSize: '0.8rem',
                                                            color: isDarkMode ? theme.palette.text.primary : theme.palette.text.secondary,
                                                        },
                                                    }}
                                                >
                                                    <Tab label="Clutches" />
                                                    <Tab label="Eggs" />
                                                </Tabs>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} justifyContent="center">
                                            <CustomTabPanel value={tabValue} index={0}>
                                                <TableContainer component={Paper} sx={{
                                                    width: '100%',
                                                    backgroundColor: isDarkMode ? theme.palette.background.default : theme.palette.background.paper,
                                                }}>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Attribute</TableCell>
                                                                <TableCell>Value</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>Clutch Size</TableCell>
                                                                <TableCell>5</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Average Weight</TableCell>
                                                                <TableCell>50g</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Incubation Period</TableCell>
                                                                <TableCell>21 days</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    sx={{ gap: 3 }}
                                                    paddingTop="18px"
                                                >
                                                    <Button variant="contained" size="small" sx={{ fontSize: '0.70rem' }}>Add Clutches</Button>
                                                    <Button variant="contained" size="small" sx={{ fontSize: '0.70rem' }}>Delete Clutches</Button>
                                                </Box>
                                            </CustomTabPanel>

                                            <CustomTabPanel value={tabValue} index={1}>
                                                <TableContainer component={Paper} sx={{
                                                    width: '100%',
                                                    backgroundColor: isDarkMode ? theme.palette.background.default : theme.palette.background.paper,
                                                }}>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Attribute</TableCell>
                                                                <TableCell>Value</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>Egg Size</TableCell>
                                                                <TableCell>Large</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Color</TableCell>
                                                                <TableCell>White</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Shell Thickness</TableCell>
                                                                <TableCell>0.5mm</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    sx={{ gap: 3 }}
                                                    paddingTop="18px"
                                                >
                                                    <Button variant="contained" size="small" sx={{ fontSize: '0.70rem' }}>Add Egg</Button>
                                                    <Button variant="contained" size="small" sx={{ fontSize: '0.70rem' }}>Delete Egg</Button>
                                                </Box>
                                            </CustomTabPanel>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))
                        }
                    </Grid >
                ))}
            </Grid >


            <AddPairModal birds={birds} isOpen={isModalOpen} onClose={handleCloseModal} onAddPair={handleAddPair} />
        </Container >
    );
};

export default PairManager;
