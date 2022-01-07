module.exports = {
    'reset': {
    },
    'bass': {
        'equalizer': [
            { 'band': 0, 'gain': 0.6 },
            { 'band': 1, 'gain': 0.67 },
            { 'band': 2, 'gain': 0.67 },
            { 'band': 3, 'gain': 0 },
            { 'band': 4, 'gain': -0.5 },
            { 'band': 5, 'gain': 0.15 },
            { 'band': 6, 'gain': -0.45 },
            { 'band': 7, 'gain': 0.23 },
            { 'band': 8, 'gain': 0.35 },
            { 'band': 9, 'gain': 0.45 },
            { 'band': 10, 'gain': 0.55 },
            { 'band': 11, 'gain': 0.6 },
            { 'band': 12, 'gain': 0.55 },
            { 'band': 13, 'gain': 0 },
        ],
    },
    'pop': {
        'equalizer': [
            { 'band': 0, 'gain': 0.65 },
            { 'band': 1, 'gain': 0.45 },
            { 'band': 2, 'gain': -0.45 },
            { 'band': 3, 'gain': -0.65 },
            { 'band': 4, 'gain': -0.35 },
            { 'band': 5, 'gain': 0.45 },
            { 'band': 6, 'gain': 0.55 },
            { 'band': 7, 'gain': 0.6 },
            { 'band': 8, 'gain': 0.6 },
            { 'band': 9, 'gain': 0.6 },
            { 'band': 10, 'gain': 0 },
            { 'band': 11, 'gain': 0 },
            { 'band': 12, 'gain': 0 },
            { 'band': 13, 'gain': 0 },
        ],
    },
    'soft': {
        'equalizer': [
            { 'band': 0, 'gain': 0 },
            { 'band': 1, 'gain': 0 },
            { 'band': 2, 'gain': 0 },
            { 'band': 3, 'gain': 0 },
            { 'band': 4, 'gain': 0 },
            { 'band': 5, 'gain': 0 },
            { 'band': 6, 'gain': 0 },
            { 'band': 7, 'gain': 0 },
            { 'band': 8, 'gain': -0.25 },
            { 'band': 9, 'gain': -0.25 },
            { 'band': 10, 'gain': -0.25 },
            { 'band': 11, 'gain': -0.25 },
            { 'band': 12, 'gain': -0.25 },
            { 'band': 13, 'gain': -0.25 },
        ],
    },
    'treblebass': {
        'equalizer': [
            { 'band': 0, 'gain': 0.6 },
            { 'band': 1, 'gain': 0.67 },
            { 'band': 2, 'gain': 0.67 },
            { 'band': 3, 'gain': 0 },
            { 'band': 4, 'gain': -0.5 },
            { 'band': 5, 'gain': 0.15 },
            { 'band': 6, 'gain': -0.45 },
            { 'band': 7, 'gain': 0.23 },
            { 'band': 8, 'gain': 0.35 },
            { 'band': 9, 'gain': 0.45 },
            { 'band': 10, 'gain': 0.55 },
            { 'band': 11, 'gain': 0.6 },
            { 'band': 12, 'gain': 0.55 },
            { 'band': 13, 'gain': 0 },
        ],
    },
    'superbass': {
        'equalizer': [
            { 'band': 0, 'gain': 0.2 },
            { 'band': 1, 'gain': 0.3 },
            { 'band': 2, 'gain': 0 },
            { 'band': 3, 'gain': 0.8 },
            { 'band': 4, 'gain': 0 },
            { 'band': 5, 'gain': 0.5 },
            { 'band': 6, 'gain': 0 },
            { 'band': 7, 'gain': -0.5 },
            { 'band': 8, 'gain': 0 },
            { 'band': 9, 'gain': 0 },
            { 'band': 10, 'gain': 0 },
            { 'band': 11, 'gain': 0 },
            { 'band': 12, 'gain': 0 },
            { 'band': 13, 'gain': 0 },
        ],
    },
    'nightcore': {
        timescale: {
            "speed": 1.165,
            "pitch": 1.125,
            "rate": 1.05
        },
    },
    'doubletime': {
        timescale: {
            "speed": 1.165
        },
    },
    'vaporwave': {
        equalizer: [
            { band: 1, gain: 0.3 },
            { band: 0, gain: 0.3 },
        ],
        timescale: { pitch: 0.5 },
        tremolo: { depth: 0.3, frequency: 14 },
    },
    'china': {
        timescale: { 
            "speed": 0.75, 
            "pitch": 1.25, 
            "rate": 1.25 
        },
    },
    'threed': {
        rotation: {
            "rotationHz": 0.2, 
        },
    },
    'dance': {
        timescale: {
            "speed": 1.25,
            "pitch": 1.25,
            "rate": 1.25
        },
    },
    'slowmotion': {
        timescale: {
            "speed": 0.5,
            "pitch": 1.0,
            "rate": 0.8
        },
    },
    'chipmunk': {
        timescale: {
            "speed": 1.05,
            "pitch": 1.35,
            "rate": 1.25
        },
    },
    'darthvader': {
        timescale: {
            "speed": 0.975,
            "pitch": 0.5,
            "rate": 0.8
        },
    },
    'vibrate': {
        vibrato: {
            "frequency": 4.0,
            "depth": 0.75
        },
        tremolo: {
            "frequency": 4.0,
            "depth": 0.75
        },
    },
    'vibrato': {
        vibrato: {
            "frequency": 4.0,
            "depth": 0.75
        },
    },
    'tremolo': {
        tremolo: {
            "frequency": 4.0,
            "depth": 0.75
        },
    },
};