import { fonts } from "../UI/fonts";
import { colors } from "../UI/theme"
import { Position } from "../util/interfaces";
import uuid from 'react-native-uuid';

// Action interface for each possible action
type ActionsType =  
    'SET_PHOTO'| 
    'SET_IMAGE_HISTORY'|
    'UPDATE_IMAGE_HISTORY'|
    'REMOVE_IMAGE_HiSTORY'|
    'SET_SELECTED_IMAGE_HISTORY_ID'|

    'SET_OVERLAY_TEXT'| 
    'ADD_TEXT_ON_IMAGE'| 
    'SET_TEXT_POSITION'|
    'SET_TEXT_FONT'|
    'SET_TEXT_FONT_SIZE'|

    'SELECT_SVG_ID'|
    'SET_SVG_POSITION'|
    'SET_SVG_SCALE'|
    'SET_SVG_COLOR'|
    // 'SET_SVG_ROTATION'|

    'SET_CHOSEN_COLOR'|
    'SET_TARGET_COLOR'|
    'TOGGLE_COLOR_PICKER' | 
    'TOGGLE_EDITOR_TEXT'|
    'TOGGLE_FONT_SIZE_SLIDER'|
    'TOGGLE_SVG_MODAL'|
    'RESET_STATE';
    

export interface Action {
    type: ActionsType ;
    payload?: any;
}

export interface ImageItem {
    id: string;
    finalImageUri: string;
    originalImageUri: string | null; 
    overlayText: string | null;
    textPosition: Position;
    textFont: string;
    textFontSize: number;
    chosenColor: string;
    svgData: { 
        id: string | null; 
        position: Position; 
        scale: number; 
        color: string;};
  }

export interface State  {
    // image state
    photoTaken: string | null;
    imageHistory: ImageItem[];
    selectedImageHistoryId: string | null;

    // text state
    overlayText: string;
    textOnImage: string | null;
    textPosition: Position;
    textFont: string;
    textFontSize: number;

    // svg state
    selectedSvgId: string | null,
    svgPosition: Position;
    svgScale: number;
    svgColor: string;
    // svgRotation: number;

    // controllers state
    chosenColor: string;
    targetColor: string;
    showColorPicker: boolean;
    showEditorText: boolean;
    showFontSizeSlider: boolean;
    showSvgModal: boolean;
    
}



export const ACTIONS = {
    // image actions
    SET_PHOTO: 'SET_PHOTO',
    SET_IMAGE_HISTORY: 'SET_IMAGE_HISTORY',
    UPDATE_IMAGE_HISTORY: 'UPDATE_IMAGE_HISTORY',
    REMOVE_IMAGE_HiSTORY: 'REMOVE_IMAGE_HiSTORY',
    SET_SELECTED_IMAGE_HISTORY_ID: 'SET_SELECTED_IMAGE_HISTORY_ID',

    // text actions
    SET_OVERLAY_TEXT: 'SET_OVERLAY_TEXT',
    ADD_TEXT_ON_IMAGE: 'ADD_TEXT_ON_IMAGE',
    SET_TEXT_POSITION: 'SET_TEXT_POSITION',
    SET_TEXT_FONT: 'SET_TEXT_FONT',
    SET_TEXT_FONT_SIZE: 'SET_TEXT_FONT_SIZE',

    // svg actions
    SELECT_SVG_ID: 'SELECT_SVG_ID',
    SET_SVG_POSITION: 'SET_SVG_POSITION',
    SET_SVG_SCALE: 'SET_SVG_SCALE',
    SET_SVG_COLOR: 'SET_SVG_COLOR',
    // SET_SVG_ROTATION: 'SET_SVG_ROTATION',

    // general controllers actions
    SET_CHOSEN_COLOR: 'SET_CHOSEN_COLOR',
    SET_TARGET_COLOR: 'SET_TARGET_COLOR',
    TOGGLE_COLOR_PICKER: 'TOGGLE_COLOR_PICKER',
    TOGGLE_EDITOR_TEXT: 'TOGGLE_EDITOR_TEXT',
    TOGGLE_FONT_SIZE_SLIDER: 'TOGGLE_FONT_SIZE_SLIDER',
    TOGGLE_SVG_MODAL: 'TOGGLE_SVG_MODAL',
    RESET_STATE: 'RESET_STATE'
} as const; // `as const` ensures that the action types are literal values immutables instead of just strings

export const initialState: State = {
    photoTaken: null,
    imageHistory: [],
    selectedImageHistoryId: null,

    overlayText: '',
    textOnImage: null,
    textPosition: { x: 0, y: 0 },
    textFontSize: 24,
    textFont: fonts.body2,

    selectedSvgId: null,
    svgPosition: { x: 0, y: 0 },
    svgScale: 1,
    svgColor: colors.titleText,
    // svgRotation: 0,

    chosenColor: colors.titleText,
    targetColor: 'text',
    showColorPicker: false,
    showEditorText: false,
    showFontSizeSlider: false,
    showSvgModal: false,

}



export const actionHandlers = {
    [ACTIONS.SET_PHOTO]: (state: State, action: Action) => ({ ...state, photoTaken: action.payload}),
    [ACTIONS.SET_IMAGE_HISTORY] : (state: State, action: Action) => {
        // Check if action.payload is an array or a single object, and convert it in an array if is an object
        const newEntries = Array.isArray(action.payload) ? action.payload : [action.payload];
        //We use `filter()` to check if the new image already exists based on the `id`
        const uniqueNewEntries = newEntries.filter((newImage) => {
            return !state.imageHistory.some((existingImage) => existingImage.id === newImage.id)
        })
        const updatedHistory = [...uniqueNewEntries, ...state.imageHistory].slice(0, 9);

        return {
            ...state,
            imageHistory: updatedHistory
        }
    },
    [ACTIONS.UPDATE_IMAGE_HISTORY]: (state: State, action: Action) => {
        const updatedHistory = state.imageHistory.map((image) => 
            image.id === action.payload.id 
                ?
            { ...image, ...action.payload} 
                :
            image);
        const finalImage = updatedHistory.slice(0, 9);
        return {
            ...state,
            imageHistory: finalImage
        }
    },
    [ACTIONS.REMOVE_IMAGE_HiSTORY]: (state: State, action: Action) => {
        const updatedHistory = state.imageHistory.filter((image) => image.id !== action.payload);
        return{
            ...state,
            imageHistory: updatedHistory
        }
    },
    [ACTIONS.SET_SELECTED_IMAGE_HISTORY_ID]: (state: State, action: Action) => {
        console.log("Reducer - selectedImageId set to:", action.payload);
        return {
            ...state, 
            selectedImageHistoryId: action.payload
        }},

    [ACTIONS.SET_OVERLAY_TEXT]: (state: State, action: Action) => ({ ...state, overlayText: action.payload}),
    [ACTIONS.ADD_TEXT_ON_IMAGE]: (state: State) => ({ ...state, textOnImage: state.overlayText, overlayText: '' }),
    [ACTIONS.SET_TEXT_POSITION]: (state: State, action: Action) => ({ ...state, textPosition: action.payload }),
    [ACTIONS.SET_TEXT_FONT]: (state: State, action: Action) => ({ ...state, textFont: action.payload }),
    [ACTIONS.SET_TEXT_FONT_SIZE]: (state: State, action: Action) => ({ ...state, textFontSize: action.payload }),

    [ACTIONS.SELECT_SVG_ID]: (state: State, action: Action) => ({ ...state, selectedSvgId: action.payload}),
    [ACTIONS.SET_SVG_POSITION]: (state: State, action: Action) => ({ ...state, svgPosition: action.payload }),
    [ACTIONS.SET_SVG_SCALE]: (state: State, action: Action) => ({ ...state, svgScale: action.payload }),
    [ACTIONS.SET_SVG_COLOR]: (state: State, action: Action) => ({ ...state, svgColor: action.payload }),
    // [ACTIONS.SET_SVG_ROTATION]: (state: State, action: Action) => ({ ...state, svgRotation: action.payload }),

    [ACTIONS.SET_CHOSEN_COLOR]: (state: State, action: Action) => ({ ...state, chosenColor: action.payload }),
    [ACTIONS.SET_TARGET_COLOR]: (state: State, action: Action) => ({ ...state, targetColor: action.payload }),
    [ACTIONS.TOGGLE_COLOR_PICKER]: (state: State) => ({ ...state, showSvgModal: false, showEditorText: false, showFontSizeSlider: false, showColorPicker: !state.showColorPicker }),
    [ACTIONS.TOGGLE_EDITOR_TEXT]: (state: State) => ({ ...state, showSvgModal: false, showFontSizeSlider: false, showColorPicker: false, showEditorText: !state.showEditorText }),
    [ACTIONS.TOGGLE_FONT_SIZE_SLIDER]: (state: State) => ({ ...state, showSvgModal: false, showEditorText: false, showColorPicker: false, showFontSizeSlider: !state.showFontSizeSlider }),
    [ACTIONS.TOGGLE_SVG_MODAL]: (state: State) => ({ ...state, showEditorText: false, showFontSizeSlider: false, showColorPicker: false, showSvgModal: !state.showSvgModal }),

    // Keep finalImageUri while resetting other state
    [ACTIONS.RESET_STATE]: (state: State) => ({...initialState,imageHistory: state.imageHistory})
}



export const reducer = (state: State, action: Action)=> {
    const handler = actionHandlers[action.type];
    if (handler) {
        return handler(state, action);
      }
    
      return state;
}


// export const reducer =(state: State, action: Action) => {
//     switch (action.type) {
//         case ACTIONS.SET_PHOTO:
//             return { ...state, photoTaken: action.payload}
            
//         case ACTIONS.TOGGLE_COLOR_PICKER:
//             return{ ...state,  showSvgModal: false, showEditorText: false, showFontSizeSlider: false, showColorPicker: !state.showColorPicker}
            
//         case ACTIONS.SET_CHOSEN_COLOR:
//             return{ ...state, chosenColor: action.payload}

//         case ACTIONS.TOGGLE_EDITOR_TEXT:
//             return{ ...state, showSvgModal: false, showFontSizeSlider: false, showColorPicker: false, showEditorText: !state.showEditorText}

//         case ACTIONS.TOGGLE_FONT_SIZE_SLIDER:
//             return{ ...state, showSvgModal: false, showEditorText: false, showColorPicker: false, showFontSizeSlider: !state.showFontSizeSlider}
            
//         case ACTIONS.SET_OVERLAY_TEXT:
//             return{ ...state, overlayText: action.payload}
            
//         case ACTIONS.ADD_TEXT_ON_IMAGE:
//             return{ ...state, textOnImage: state.overlayText, overlayText: ''}
            
//         case ACTIONS.SET_TEXT_POSITION:
//             return { ...state, textPosition: action.payload};
     
//         case ACTIONS.SET_TEXT_FONT:
//             return { ...state, textFont: action.payload};
                
//         case ACTIONS.SET_TEXT_FONT_SIZE:
//             return { ...state, textFontSize: action.payload};

//         case ACTIONS.TOGGLE_SVG_MODAL: // add all other states false so they would close automatically when this one will open
//             return { ...state, showEditorText: false, showFontSizeSlider: false, showColorPicker: false, showSvgModal: !state.showSvgModal};
        
//         case ACTIONS.SELECT_SVG_ID:
//             return { ...state, selectedSvgId: action.payload, showSvgModal: !state.showSvgModal};

//         case ACTIONS.SET_SVG_POSITION:
//             return { ...state, svgPosition: action.payload};

//         case ACTIONS.SET_SVG_SCALE:
//             return { ...state, svgScale: action.payload };

//         case ACTIONS.SET_SVG_COLOR:
//             return{ ...state, svgColor: action.payload}

//         case ACTIONS.SET_SVG_ROTATION:  
//             return { ...state, svgRotation: action.payload };
        
//         case ACTIONS.SET_TARGET_COLOR:
//             return { ...state, targetColor: action.payload };

//         case ACTIONS.SET_FINAL_IMAGE_URI:
//             return { ...state, finalImageUri: action.payload };

//         case ACTIONS.RESET_STATE:
//             const newState = { 
//                 ...initialState,
//                 finalImageUri: state.finalImageUri 
//             };
//             return newState;

//         default:
//             return state;
//     }
// }


