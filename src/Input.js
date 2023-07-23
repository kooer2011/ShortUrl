import React, { useState } from 'react';
import { Typography, AppBar, Toolbar, Box, Button, Grid } from '@mui/material';
import { InputLabel } from '@mui/material';
import db from './firebase';
import TextField from '@mui/material/TextField';
import Background from './Background';
import copy from 'copy-to-clipboard';
import DenseAppBar from './Navbar';
import QRCode from 'qrcode.react';
const tinyid = require('tiny-unique-id');

function Input() {
  const [shorten, setShorten] = useState('');
  const [links, setLinks] = useState([]);
  const [input, setInput] = useState('');
  const handleDb = async () => {
    const slug = tinyid.unique();
    await db.collection('url').add({
      url: input,
      slug: slug,
    });
    setShorten(`${window.location.origin}/${slug}`);
  };
  //
  return (
    <>
      <DenseAppBar />
      <Grid fullWidth mt={20} container justifyContent="center">
        <Grid fullWidth>
          <Box display="flex">
            <Box mr={2}>
              <Typography variant="h5">SHORT-URL</Typography>
            </Box>
          </Box>
          <Box fullWidth>
            <TextField
              disabled
              fullWidth
              placeholder="SHORT URL"
              id="filled-basic"
              variant="filled"
              value={shorten}
            />

            <Button
              size="small"
              onClick={() => copy(shorten)}
              variant="contained"
            >
              Coppy
            </Button>

            <TextField
              fullWidth
              type="url"
              value={input}
              placeholder="INPUT URL "
              onChange={e => setInput(e.target.value)}
            />
          </Box>

          <Button size="small" onClick={handleDb} variant="contained">
            Create Shortcode
          </Button>
        </Grid>
      </Grid>

      {input && (
        <Grid fullWidth container justifyContent="center" mt={4}>
          <QRCode value={input} />
        </Grid>
      )}
    </>
  );
}

export default Input;
