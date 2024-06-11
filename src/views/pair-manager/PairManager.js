import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, MenuItem, Button, Modal, Box, Card, Select, FormControl, Badge, InputLabel, } from '@mui/material';

// Import bird images
import lbird1 from 'src/assets/images/birdpics/LOVE BIRDS/Fischer\'s lovebird.jpg';
import lbird2 from 'src/assets/images/birdpics/LOVE BIRDS/Rosy-faced lovebird.jpg';
import lbird3 from 'src/assets/images/birdpics/LOVE BIRDS/Yellow-collared lovebird.jpg';
import lbird4 from 'src/assets/images/birdpics/LOVE BIRDS/Lilian\'s lovebird.jpg';
import sbird1 from 'src/assets/images/birdpics/SONG BIRDS/blackcap.jpg';
import sbird2 from 'src/assets/images/birdpics/SONG BIRDS/gray catbird.jpg';


// --- BIRD CARD --- // 
const BirdCard = ({ bird, index, nest, dateOfBeginning }) => {
    return (
        <Card sx={{ padding: 1, borderRadius: 1, boxShadow: 1, backgroundColor: '#edf1fa' }}>
            <Grid container spacing={2}>
                {/* Row 1: Badge */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', marginTop: 2 }}>
                    <Badge
                        color={bird.status === 'Active' ? 'success' : bird.status === 'Dead' ? 'error' : 'default'}
                        badgeContent={bird.status}
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: 1,
                            '.MuiBadge-badge': {
                                fontSize: '0.7rem',
                                height: '16px',
                                minWidth: '15px',
                                borderRadius: '10px',
                                right: '25px',
                            }
                        }}
                    />
                </Grid>

                {/* Row 2: Image and Description */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height:'300px', maxHeight:'250px' }}>
                        <img
                            src={bird.imageUrl}
                            alt={bird.name}
                            style={{
                                height: '85px',
                                width: '85px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                marginBottom: '16px'
                            }}
                        />
                        <Typography variant="h6" gutterBottom>{bird.name}</Typography>
                        <Typography variant="body2" gutterBottom><b>Band Number:</b> {bird.bandNumber}</Typography>
                        <Typography variant="body2" gutterBottom><b>Gender:</b> {bird.sex}</Typography>
                        <Typography variant="body2" gutterBottom><b>Date of Branding:</b> {bird.dateOfBanding}</Typography>
                        <Typography variant="body2" gutterBottom><b>Date of Birth:</b> {bird.dateOfBirth}</Typography>
                    </Box>
                </Grid>

            </Grid>
        </Card>
    );
};


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
            },
            female: {
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
            },
            nest: "Default Nest",
            dateOfBeginning: "2024-03025",
        },


    ]);
    // -------------------------- //



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
        },
        // Add more birds
    ];
    // ----------------



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
                                <Card
                                // sx={{
                                //  backgroundColor: '#ffffff',
                                // '&:hover': {
                                //      backgroundColor: '#ecf2ff',
                                //     transform: 'scale(1.04)', // Smaller scale for zoom in effect
                                //     transition: 'transform 0.3s ease-in-out', // Smooth transition
                                // },
                                // marginBottom: '15px' // Added margin bottom directly to Card component
                                // }}
                                >
                                    {/* Pair Information */}

                                    <Typography variant="h4" color="primary" align="center" gutterBottom>
                                        Pair Information
                                    </Typography>

                                    <Grid container spacing={2} alignItems="center">
                                        {/* Pair Number */}
                                        <Grid item xs={12} sm={12}>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Pair Number:</b> {pairs.findIndex(p => p === pair) + 1}
                                            </Typography>

                                            <Typography variant="body2" color="textSecondary">
                                                <b>Nest:</b> {pair.nest}
                                            </Typography>
                                        </Grid>
                                        {/* Date of Beginning */}

                                    </Grid>


                                    {/* Bird Cards */}
                                    <Grid container style={{ paddingTop: '12px' }} spacing={2}>
                                        {/* First Column: Male Bird Card */}
                                        <Grid item xs={12} sm={6}>
                                            <BirdCard bird={pair.male} index={pairIndex * 2} nest={pair.nest} dateOfBeginning={pair.dateOfBeginning} />
                                        </Grid>

                                        {/* Second Column: Female Bird Card */}
                                        <Grid item xs={12} sm={6}>
                                            <BirdCard bird={pair.female} index={pairIndex * 2 + 1} nest={pair.nest} dateOfBeginning={pair.dateOfBeginning} />
                                        </Grid>

                                        <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
                                            <Typography variant="caption" color="textSecondary">
                                                <b>Date of Beginning:</b> {pair.dateOfBeginning}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>


            <AddPairModal birds={birds} isOpen={isModalOpen} onClose={handleCloseModal} onAddPair={handleAddPair} />
        </Container>

    );
};

export default PairManager;
