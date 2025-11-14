import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import leadsService from '../../services/leadsService';

const initialState = {
  leads: [],
  lead: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  filters: {
    status: 'all',
    owner: 'all',
    search: '',
  },
};

export const getLeads = createAsyncThunk(
  'leads/getAll',
  async (filters, thunkAPI) => {
    try {
      return await leadsService.getLeads(filters);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createLead = createAsyncThunk(
  'leads/create',
  async (leadData, thunkAPI) => {
    try {
      return await leadsService.createLead(leadData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateLead = createAsyncThunk(
  'leads/update',
  async ({ id, data }, thunkAPI) => {
    try {
      return await leadsService.updateLead(id, data);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteLead = createAsyncThunk(
  'leads/delete',
  async (id, thunkAPI) => {
    try {
      return await leadsService.deleteLead(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.leads = action.payload;
      })
      .addCase(getLeads.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.leads.push(action.payload);
        state.isSuccess = true;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        const index = state.leads.findIndex(
          (lead) => lead.id === action.payload.id
        );
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
        state.isSuccess = true;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.leads = state.leads.filter((lead) => lead.id !== action.payload);
        state.isSuccess = true;
      });
  },
});

export const { reset, setFilters } = leadsSlice.actions;
export default leadsSlice.reducer;