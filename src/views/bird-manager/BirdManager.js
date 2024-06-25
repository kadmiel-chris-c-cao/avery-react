import React, { useState } from 'react';
// eslint-disable-next-line
import {
    Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Grid, Paper,
    Tab, Tabs, TextField, Typography, FormControl, MenuItem, Select, Card, CardContent, CardMedia, Badge,
} from '@mui/material';



import lbird1 from 'src/assets/images/birdpics/LOVE BIRDS/Fischer\'s lovebird.jpg';
import lbird2 from 'src/assets/images/birdpics/LOVE BIRDS/Rosy-faced lovebird.jpg';
import lbird3 from 'src/assets/images/birdpics/LOVE BIRDS/Yellow-collared lovebird.jpg';
import lbird4 from 'src/assets/images/birdpics/LOVE BIRDS/Lilian\'s lovebird.jpg';
import sbird1 from 'src/assets/images/birdpics/SONG BIRDS/blackcap.jpg';
import sbird2 from 'src/assets/images/birdpics/SONG BIRDS/gray catbird.jpg';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const BirdManager = () => {
    const [allBirds, setAllBirds] = useState([
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
        {
            id: 7,
            name: "Scarlet Macaw",
            bandnumber: '101',
            sex: 'Male',
            cageNumber: 'Cage 2',
            dateOfBanding: '2022-04-01',
            dateOfBirth: '2021-04-01',
            status: 'Dead',
            originDescription: 'Native to South America',
            genetics: 'Some genetic information',
            imageUrl: lbird4,
            additionalInfo: 'Additional notes about the bird.',
        },
        {
            id: 8,
            name: "Cockatiel",
            bandnumber: '202',
            sex: 'Female',
            cageNumber: 'Cage 3',
            dateOfBanding: '2022-05-01',
            dateOfBirth: '2021-05-01',
            status: 'Dead',
            originDescription: 'Native to Australia',
            genetics: 'Some genetic information',
            imageUrl: sbird1,
            additionalInfo: 'Additional notes about the bird.',
        },
        // Add more bird data as needed
    ]);

    const [newBird, setNewBird] = useState({
        id: 0,
        name: '',
        bandnumber: '',
        sex: '',
        cageNumber: '',
        dateOfBanding: '',
        dateOfBirth: '',
        status: '',
        originDescription: '',
        genetics: '',
        imageUrl: '',
        additionalInfo: '',
    });


    const [selectedImage, setSelectedImage] = useState(null);

    // search // 
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState({ cage: 'All', status: 'All', gender: 'All' });

    const statuses = ['All', 'Active', 'Dead']; // Add more statuses as needed
    const genders = ['All', 'Male', 'Female']; // Add more gender as needed
    const categories = ['All', 'Cage 1', 'Cage 2', 'Cage 3', 'Cage 4']; // Add more categories as needed

    const [tabValue, setTabValue] = useState(0);
    const [selectedBird, setSelectedBird] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedBird, setEditedBird] = useState(null);

    // FILTERING TABLE //

    const filteredBirds = allBirds.filter((bird) => {
        const matchesCage = selectedCategory.cage === 'All' || bird.cageNumber === selectedCategory.cage;
        const matchesStatus = selectedCategory.status === 'All' || bird.status === selectedCategory.status;
        const matchesGender = selectedCategory.gender === 'All' || bird.sex === selectedCategory.gender;
        const matchesSearch = bird.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCage && matchesStatus && matchesGender && matchesSearch;
    });

    // ---------------//

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleOpenModal = (bird) => {
        setSelectedBird(bird);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedBird(null);
        setIsModalOpen(false);
    };

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleAddBird = () => {
        const newBirdData = {
            ...newBird,
            id: allBirds.length + 1,
            imageUrl: URL.createObjectURL(selectedImage), // Temporary URL for preview
        };

        setAllBirds((prevBirds) => [...prevBirds, newBirdData]);

        setNewBird({
            id: 0,
            name: '',
            bandnumber: '',
            sex: '',
            cageNumber: '',
            dateOfBanding: '',
            dateOfBirth: '',
            status: '',
            originDescription: '',
            genetics: '',
            imageUrl: '',
            additionalInfo: '',
        });
        setSelectedImage(null);

        setIsAddModalOpen(false);
    };

    const handleOpenEditModal = (bird) => {
        setEditedBird(bird);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditedBird(null);
        setIsEditModalOpen(false);
    };

    const handleSaveChanges = () => {
        // Update the bird in allBirds state with the editedBird data
        const updatedBirds = allBirds.map((bird) => {
            if (bird.id === editedBird.id) {
                return editedBird;
            }
            return bird;
        });
        setAllBirds(updatedBirds);

        // Update selectedBird if it matches the edited bird
        if (selectedBird && selectedBird.id === editedBird.id) {
            setSelectedBird(editedBird);
        }

        setEditedBird(null);
        setIsEditModalOpen(false);
    };

    const handleDeleteBird = () => {
        // Filter out the selected bird from the allBirds state
        const updatedBirds = allBirds.filter(bird => bird.id !== selectedBird.id);
        setAllBirds(updatedBirds);
        // Close the modal after deletion
        handleCloseModal();
    };


    // Function to determine background color based on sex
    const getCardColor = (sex) => {
        return sex === 'Male'
            ? 'rgba(181, 234, 234, 0.3)' // Light blue with 30% opacity
            : 'rgba(255, 188, 188, 0.3)'; // Light pink with 30% opacity
    };



    return (
        <Container maxWidth="lg" sx={{ mt: 4, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'none' }}>
            <Grid container spacing={3} sx={{ boxShadow: 'none' }}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'none' }}>




                        <Grid container sx={{ marginBottom: '15px' }}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h3" component="div" sx={{ mb: { xs: 2, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
                                    Bird Manager
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>

                                {/* Add Bird Button */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        position: 'relative',
                                        //marginTop: '15px',
                                        width: { xs: '100%', sm: '200px' },
                                        backgroundColor: '#4d7dde',
                                        color: 'white',
                                        borderRadius: '10px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                        transition: 'background-color 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#5d87ff',
                                        },
                                        '&:focus': {
                                            outline: 'none',
                                        },
                                        '& .MuiButton-label': {
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                    onClick={handleOpenAddModal}
                                >
                                    Add Bird
                                </Button>

                            </Grid>
                        </Grid>





                        <TextField
                            label="Search Bird"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                        />


                        {/* GRID FOR CATEGORY AND STATUS */}
                        <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: '10px' }}>

                            {/* CATEGORY */}
                            <Grid item xs={12} lg={2}>
                                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="category-label">Cage</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        value={selectedCategory.cage}
                                        onChange={(e) => setSelectedCategory({ ...selectedCategory, cage: e.target.value })}
                                        label="Category"
                                    >
                                        {categories.map((cageNumber) => (
                                            <MenuItem key={cageNumber} value={cageNumber}>
                                                {cageNumber}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* STATUS */}
                            <Grid item xs={12} lg={2}>
                                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="status-label">Status</InputLabel>
                                    <Select
                                        labelId="status-label"
                                        value={selectedCategory.status}
                                        onChange={(e) => setSelectedCategory({ ...selectedCategory, status: e.target.value })}
                                        label="Status"
                                    >
                                        {statuses.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* GENDER */}
                            <Grid item xs={12} lg={2}>
                                <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        value={selectedCategory.gender}
                                        onChange={(e) => setSelectedCategory({ ...selectedCategory, gender: e.target.value })}
                                        label="Gender"
                                    >
                                        {genders.map((gender) => (
                                            <MenuItem key={gender} value={gender}>
                                                {gender}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>


                        {/* GRID FOR DATA CARD DISPLAY */}
                        <Grid container spacing={3}>
                            {filteredBirds.map((bird) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={bird.id}>
                                    <Card
                                        sx={{
                                            maxWidth: 340,
                                            maxHeight: 380,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s',
                                            backgroundColor: getCardColor(bird.sex),
                                            '&:hover': {
                                                transform: 'scale(1.09)',
                                                backgroundColor: getCardColor(bird.sex), // Dynamic background color
                                            },
                                        }}
                                        onClick={() => handleOpenModal(bird)}
                                    >



                                        <Grid container sx={{ marginBottom: '15px' }}>
                                            <Grid item xs={11}>
                                                <Typography variant="caption" color="textSecondary" >
                                                    <b>Cage No: </b>{bird.cageNumber}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Badge
                                                    badgeContent={bird.status}
                                                    color={bird.status === 'Active' ? 'success' : 'error'}
                                                    sx={{ fontWeight: 'bold' }}
                                                >
                                                </Badge>
                                            </Grid>
                                        </Grid>





                                        <CardMedia
                                            component="img"
                                            src={bird.imageUrl}
                                            alt={bird.name}
                                            sx={{
                                                display: 'block', // Make the image a block element
                                                margin: 'auto', // Center the image horizontally
                                                width: '200px', // Set width and height to create a square
                                                height: '200px', // Set width and height to create a square
                                                objectFit: 'cover', // Maintain aspect ratio and cover the container
                                                borderRadius: '12px', // Optionally, add border radius for rounded corners
                                                marginBottom: '10px',
                                            }}
                                        />




                                        <CardContent sx={{ p: '20px', marginTop: '-20px', textAlign: 'center' }}>
                                            <Typography variant="h4">{bird.name}</Typography>
                                            <Typography variant="body2" color="textSecondary" sx={{ pt: '6px' }}>
                                                <b>Date of Birth: </b>{bird.dateOfBirth}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Band Number: </b>{bird.bandnumber}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                <b>Gender: </b>{bird.sex}
                                            </Typography>
                                            {/* Additional content here */}
                                        </CardContent>




                                    </Card>


                                </Grid>
                            ))}
                        </Grid>



                    </Paper>
                </Grid>
            </Grid >



            {/* Add Bird Modal */}
            <Dialog Dialog open={isAddModalOpen} onClose={handleCloseAddModal} >
                <DialogTitle>Add New Bird</DialogTitle>
                <DialogContent>


                    <Grid container>
                        <Grid item xs={12}>
                            {/* Tabs for Add Bird modal */}
                            <Tabs
                                value={tabValue}
                                variant="scrollable"
                                scrollButtons="auto"
                                onChange={handleTabChange}
                                centered
                            >
                                <Tab label="General Info" />
                                <Tab label="Origin" />
                                <Tab label="Genetics" />
                                <Tab label="Image" />
                                <Tab label="Additional Info" />
                            </Tabs>
                        </Grid>

                        <Grid item xs={12}>
                            {/* Tab Panels */}
                            <Grid container>
                                <Grid item xs={12}>
                                    <TabPanel value={tabValue} index={0}>
                                        {/* General Info Tab */}
                                        <TextField
                                            label="Name"
                                            fullWidth
                                            margin="normal"
                                            value={newBird.name}
                                            onChange={(e) => setNewBird((prev) => ({ ...prev, name: e.target.value }))}
                                        />
                                        <TextField
                                            label="Band Number"
                                            fullWidth
                                            margin="normal"
                                            value={newBird.bandnumber}
                                            onChange={(e) => setNewBird((prev) => ({ ...prev, bandnumber: e.target.value }))}
                                        />
                                        <InputLabel id="sex-select-label">Sex</InputLabel>

                                        <Select
                                            labelId="sex-select-label"
                                            id="sex-select"
                                            fullWidth
                                            value={newBird.sex}
                                            onChange={(e) => setNewBird((prev) => ({ ...prev, sex: e.target.value }))}
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                        </Select>

                                        <TextField
                                            label="Cage Number"
                                            fullWidth
                                            margin="normal"
                                            value={newBird.cageNumber}
                                            onChange={(e) => setNewBird((prev) => ({ ...prev, cageNumber: e.target.value }))}
                                        />
                                        <TextField
                                            type="date"
                                            fullWidth
                                            margin="normal"
                                            value={newBird.dateOfBanding}
                                            onChange={(e) => setNewBird((prev) => ({ ...prev, dateOfBanding: e.target.value }))}
                                        />
                                        <TextField
                                            type="date"
                                            fullWidth
                                            margin="normal"
                                            value={newBird.dateOfBirth}
                                            onChange={(e) => setNewBird((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                                        />

                                        <InputLabel id="status-select-label">Status</InputLabel>
                                        <Select
                                            labelId="status-select-label"
                                            id="status-select"
                                            fullWidth
                                            value={newBird.status}
                                            onChange={(e) => setNewBird((prev) => ({ ...prev, status: e.target.value }))}
                                        >
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="Dead">Dead</MenuItem>
                                        </Select>

                                    </TabPanel>
                                </Grid>

                                <Grid item xs={12}>
                                    <TabPanel value={tabValue} index={1}>
                                        {/* Origin Tab */}
                                        <TextField
                                            label="Origin Description"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            margin="normal"
                                            value={newBird.originDescription}
                                            onChange={(e) => setNewBird((prev) => ({ ...prev, originDescription: e.target.value }))}
                                        />
                                    </TabPanel>
                                </Grid>

                                <Grid item xs={12}>
                                    <TabPanel value={tabValue} index={2}>
                                        {/* Genetics Tab */}
                                        <TextField
                                            label="Genetics"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            margin="normal"
                                            value={newBird.genetics}
                                            onChange={(e) => setNewBird((prev) => ({ ...prev, genetics: e.target.value }))}
                                        />
                                    </TabPanel>
                                </Grid>

                                <Grid item xs={12}>
                                    <TabPanel value={tabValue} index={3}>
                                        {/* Image Tab */}
                                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                                    </TabPanel>
                                </Grid>

                                <Grid item xs={12}>
                                    <TabPanel value={tabValue} index={4}>
                                        {/* Additional Info Tab */}
                                        <TextField
                                            label="Additional Notes"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            margin="normal"
                                            value={newBird.additionalInfo}
                                            onChange={(e) => setNewBird((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                                        />
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>








                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', marginBottom: '15px' }}>
                    <Button onClick={handleCloseAddModal}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddBird}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog >


            {/* Detailed View Modal */}
            <Dialog Dialog open={isModalOpen} onClose={handleCloseModal} >
                <DialogTitle>

                    <Grid container>
                        <Grid item xs={11}>
                            <Typography variant="body1">
                                <strong>Band Number:</strong> {selectedBird?.bandnumber}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Badge
                                badgeContent={selectedBird?.status}
                                color={selectedBird?.status === 'Active' ? 'success' : 'error'}
                                sx={{ fontWeight: 'bold' }}
                            >
                            </Badge>
                        </Grid>
                        <Grid container sx={{ alignContent: 'center' }}>
                            {selectedBird?.name}
                        </Grid>
                    </Grid>


                </DialogTitle>

                <DialogContent>

                    {/* image detail */}

                    <img
                        src={selectedBird?.imageUrl}
                        alt={selectedBird?.name}
                        style={{
                            display: 'block', // Make the image a block element
                            margin: 'auto', // Center the image horizontally
                            width: '200px', // Set width and height to create a square
                            height: '200px', // Set width and height to create a square
                            objectFit: 'cover', // Maintain aspect ratio and cover the container
                            borderRadius: '12px', // Optionally, add border radius for rounded corners
                            marginBottom: '25px',
                            marginTop: '15px',
                        }}
                    />


                    {/* Display detailed information */}

                    <Typography variant="body1">
                        <strong>Cage Number:</strong> {selectedBird?.cageNumber}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Sex:</strong> {selectedBird?.sex}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Date of Banding:</strong> {selectedBird?.dateOfBanding}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Date of Birth:</strong> {selectedBird?.dateOfBirth}
                    </Typography>

                    {/*
                    <Typography variant="body1">
                        <strong>Status:</strong>{' '}
                        <span style={{ fontWeight: 'bold', color: selectedBird?.status === 'Active' ? '#4CAF50' : selectedBird?.status === 'Dead' ? '#FF5252' : 'inherit' }}>
                            {selectedBird?.status}
                        </span>
                    </Typography>
                    */}


                    <Typography variant="body1">
                        <strong>Origin Description:</strong> {selectedBird?.originDescription}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Genetics:</strong> {selectedBird?.genetics}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        <strong>Additional Notes:</strong> {selectedBird?.additionalInfo}
                    </Typography>
                </DialogContent>


                <DialogActions sx={{ justifyContent: 'center', marginBottom: '15px' }}>
                    <Button onClick={handleDeleteBird} color="error">
                        Delete
                    </Button>
                    <Button onClick={() => handleOpenEditModal(selectedBird)}>Edit</Button>
                    <Button onClick={handleCloseModal}>Close</Button>
                </DialogActions>


            </Dialog >


            {/* Edit Bird Modal */}
            <Dialog Dialog open={isEditModalOpen} onClose={handleCloseEditModal} >
                <DialogTitle>Edit Bird</DialogTitle>
                <DialogContent>
                    {/* Tabs for Add Bird modal */}
                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                        <Tab label="General Info" />
                        <Tab label="Origin" />
                        <Tab label="Genetics" />
                        <Tab label="Image" />
                        <Tab label="Additional Info" />
                    </Tabs>

                    {/* Content for Edit Bird Modal */}
                    {editedBird && (
                        <>
                            {/* Add other fields for editing */}
                            <TabPanel value={tabValue} index={0}>
                                {/* General Info Tab */}
                                <TextField
                                    label="Name"
                                    fullWidth
                                    margin="normal"
                                    value={editedBird.name}
                                    onChange={(e) => setEditedBird((prev) => ({ ...prev, name: e.target.value }))}
                                />
                                <TextField
                                    label="Band Number"
                                    fullWidth
                                    margin="normal"
                                    value={editedBird.bandnumber}
                                    onChange={(e) => setEditedBird((prev) => ({ ...prev, bandnumber: e.target.value }))}
                                />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="sex-label">Sex</InputLabel>
                                    <Select
                                        labelId="sex-label"
                                        value={editedBird.sex}
                                        onChange={(e) => setEditedBird((prev) => ({ ...prev, sex: e.target.value }))}
                                        label="Sex"
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        {/* Add more options as needed */}
                                    </Select>
                                </FormControl>

                                <TextField
                                    label="Cage Number"
                                    fullWidth
                                    margin="normal"
                                    value={editedBird.cageNumber}
                                    onChange={(e) => setEditedBird((prev) => ({ ...prev, cageNumber: e.target.value }))}
                                />
                                <h5 style={{ marginBottom: '-10px', padding: '0' }}> Date of Branding</h5>
                                <TextField
                                    //label="Date of Banding"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    value={editedBird.dateOfBanding}
                                    onChange={(e) => setEditedBird((prev) => ({ ...prev, dateOfBanding: e.target.value }))}
                                />
                                <h5 style={{ marginBottom: '-10px', padding: '0' }}> Date of Birth</h5>
                                <TextField
                                    //label="Date of Birth"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    value={editedBird.dateOfBirth}
                                    onChange={(e) => setEditedBird((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                                />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="status-label">Status</InputLabel>
                                    <Select
                                        labelId="status-label"
                                        value={editedBird.status}
                                        onChange={(e) => setEditedBird((prev) => ({ ...prev, status: e.target.value }))}
                                        label="Status"
                                    >
                                        <MenuItem value="Active">Active</MenuItem>
                                        <MenuItem value="Dead">Dead</MenuItem>
                                    </Select>
                                </FormControl>

                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                {/* Origin Tab */}
                                <TextField
                                    label="Origin Description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    value={editedBird.originDescription}
                                    onChange={(e) => setEditedBird((prev) => ({ ...prev, originDescription: e.target.value }))}
                                />
                            </TabPanel>
                            <TabPanel value={tabValue} index={2}>
                                {/* Genetics Tab */}
                                <TextField
                                    label="Genetics"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    value={editedBird.genetics}
                                    onChange={(e) => setEditedBird((prev) => ({ ...prev, genetics: e.target.value }))}
                                />
                            </TabPanel>
                            <TabPanel value={tabValue} index={3}>
                                {/* Image Tab */}
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </TabPanel>
                            <TabPanel value={tabValue} index={4}>
                                {/* Additional Info Tab */}
                                <TextField
                                    label="Additional Notes"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    value={editedBird.additionalInfo}
                                    onChange={(e) => setEditedBird((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                                />
                            </TabPanel>
                        </>
                    )}
                </DialogContent>


                <DialogActions sx={{ justifyContent: 'center', marginBottom: '15px' }}>
                    <Button onClick={handleCloseEditModal}>Cancel</Button>
                    <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
                </DialogActions>




            </Dialog >



        </Container >
    );
};

export default BirdManager;
