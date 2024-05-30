import React, { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

// Import your bird images here
import lbird1 from 'src/assets/images/birdpics/LOVE BIRDS/Fischer\'s lovebird.jpg';
import lbird2 from 'src/assets/images/birdpics/LOVE BIRDS/Rosy-faced lovebird.jpg';
import lbird3 from 'src/assets/images/birdpics/LOVE BIRDS/Yellow-collared lovebird.jpg';
import lbird4 from 'src/assets/images/birdpics/LOVE BIRDS/Lilian\'s lovebird.jpg';
import sbird1 from 'src/assets/images/birdpics/SONG BIRDS/blackcap.jpg';
import sbird2 from 'src/assets/images/birdpics/SONG BIRDS/gray catbird.jpg';

const BirdFiltering = () => {
    const [allBirds, setAllBirds] = useState([
        { id: 1, name: "Fischer's lovebird", category: 'Lovebird', imageUrl: lbird1, description: 'The rosy-faced lovebird, also known as the rosy-collared or peach-faced lovebird, is a species of lovebird native to arid regions in southwestern Africa such as the Namib Desert. Loud and constant chirpers, these birds are very social animals and often congregate in small groups in the wild.' },
        { id: 2, name: "Rosy-faced lovebird", category: 'Lovebird', imageUrl: lbird2, description: 'This is a Rosy-faced lovebird.' },
        { id: 3, name: "Yellow-collared lovebird", category: 'Lovebird', imageUrl: lbird3, description: 'This is a Yellow-collared lovebird.' },
        { id: 4, name: "Lilian's lovebird", category: 'Lovebird', imageUrl: lbird4, description: 'This is a Lilian\'s lovebird.' },
        { id: 5, name: "Blackcap", category: 'Songbird', imageUrl: sbird1, description: 'The Eurasian blackcap, usually known simply as the blackcap, is a common and widespread typical warbler. It has mainly olive-grey upperparts and pale grey underparts, and differences between the five subspecies are small.' },
        { id: 6, name: "Grey catbird", category: 'Songbird', imageUrl: sbird2, description: 'The gray catbird, also spelled grey catbird, is a medium-sized North American and Central American perching bird of the mimid family. It is the only member of the "catbird" genus Dumetella.' },

    ]);

    const [newBird, setNewBird] = useState({
        id: 0,
        name: '',
        category: '',
        imageUrl: '',
        description: '',
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBird, setSelectedBird] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredBirds = allBirds.filter((bird) => {
        const matchesCategory = selectedCategory === 'All' || bird.category === selectedCategory;
        const matchesSearch = bird.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = ['All', 'Songbird', 'Lovebird'];

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

    const handleEditBird = () => {
        // Handle edit functionality here
        // You can implement another modal or a form for editing
        // You might need to manage additional state for editing
        // For simplicity, I'm just closing the modal here
        setIsModalOpen(false);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        // You may want to add additional logic for handling file uploads (e.g., validation, preview, etc.)
    };

    const handleAddBird = () => {
        // Handle add functionality here
        // You can collect data from form fields in the "Add Bird" modal
        // and add a new bird to the allBirds array

        const newBirdData = {
            ...newBird,
            id: allBirds.length + 1,
            imageUrl: URL.createObjectURL(selectedImage), // Use a temporary URL for preview
        };

        setAllBirds((prevBirds) => [...prevBirds, newBirdData]);

        // Clear the form and reset selected image
        setNewBird({
            id: 0,
            name: '',
            category: '',
            imageUrl: '',
            description: '',
        });
        setSelectedImage(null);

        setIsAddModalOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'none' }}>
                        <Typography variant="h3" component="div" sx={{ mb: 2 }}>
                            Bird Library
                        </Typography>

                        <TextField
                            label="Search Bird"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ mb: 2, width: '100%' }}
                        />

                        <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                label="Category"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <Grid container spacing={3}>
                            {filteredBirds.map((bird) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={bird.id}>
                                    <Paper
                                        sx={{ p: 2, textAlign: 'center', height: '100%', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
                                        onClick={() => handleOpenModal(bird)}
                                    >
                                        <img
                                            src={bird.imageUrl}
                                            alt={bird.name}
                                            style={{
                                                width: '100%',
                                                maxHeight: '150px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                            }}
                                        />
                                        <Typography variant="h6" gutterBottom>
                                            {bird.name}
                                        </Typography>
                                        <Typography color="textSecondary">{bird.category}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Add Bird Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                position: 'relative',
                                marginTop: '15px',
                                width: '200px',
                                backgroundColor: '#45a049D', // Green color for the background
                                color: 'white', // Text color
                                '&:hover': {
                                    backgroundColor: '#45a049D', // Darker green on hover
                                },
                                borderRadius: '10px', // Rounded corners
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Box shadow for depth
                            }}
                            onClick={handleOpenAddModal}
                        >
                            Add Bird
                        </Button>
                        {/* Add Bird Button End */}



                    </Paper>
                </Grid>
            </Grid>

            {/* Add Bird Modal */}
            <Dialog open={isAddModalOpen} onClose={handleCloseAddModal}>
                <DialogTitle>Add New Bird</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Bird Name"
                        fullWidth
                        margin="normal"
                        value={newBird.name}
                        onChange={(e) => setNewBird((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <TextField
                        select
                        label="Category"
                        fullWidth
                        margin="normal"
                        value={newBird.category}
                        onChange={(e) => setNewBird((prev) => ({ ...prev, category: e.target.value }))}
                    >
                        <MenuItem value="Lovebird">Lovebird</MenuItem>
                        <MenuItem value="Songbird">Songbird</MenuItem>
                    </TextField>
                    {/* Add File Input for Image Upload */}
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {/* Existing TextFields */}
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={newBird.description}
                        onChange={(e) => setNewBird((prev) => ({ ...prev, description: e.target.value }))}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', marginBottom: '15px' }}>
                    <Button
                        onClick={handleCloseAddModal}
                        sx={{
                            backgroundColor: '#FF5252', // Red color for the background
                            color: 'white', // Text color
                            '&:hover': {
                                backgroundColor: '#D32F2F', // Darker red on hover
                            },
                            borderRadius: '10px', // Rounded corners
                            margin: '0 8px', // Add margin for spacing
                            minWidth: '25px', // Set the minimum width to 25px
                            padding: '8px', // Add padding for better visibility
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddBird}
                        color="primary"
                        disabled={!selectedImage}
                        sx={{
                            backgroundColor: '#4CAF50', // Green color for the background
                            color: 'white', // Text color
                            '&:hover': {
                                backgroundColor: '#45a049', // Darker green on hover
                            },
                            borderRadius: '10px', // Rounded corners
                            margin: '0 8px', // Add margin for spacing
                            minWidth: '25px', // Set the minimum width to 25px
                            padding: '8px', // Add padding for better visibility
                        }}
                    >
                        Add
                    </Button>


                </DialogActions>
            </Dialog>

            {/* Modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>{selectedBird?.name}</DialogTitle>
                <DialogContent>
                    <img src={selectedBird?.imageUrl} alt={selectedBird?.name} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }} />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {selectedBird?.description}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditBird} color="primary">
                        Edit
                    </Button>
                    <Button onClick={handleCloseModal}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BirdFiltering;
