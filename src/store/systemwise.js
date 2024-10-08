import { defineStore } from 'pinia';
import API from '../utils/API.js';

export const useSystemwiseStore = defineStore('systemwise', {
  state: () => {
    return {
      componeyData: [],
      companyExist: null,
    };
  },
  getters: {},
  actions: {
    async fetchData(taxId) {
      this.componeyData = [];
      this.companyExist = null;
      let { data } = await API.GET(
        `/od/data/api/673F0FC0-B3A7-429F-9041-E9866836B66D?$format=json&$filter=No eq ${taxId}&$skip=0&$top=50`,
      );
      this.componeyData = data;
      if (data[0].exist === 'Y') {
        this.companyExist = true;
      }
      if (data[0].exist === 'N') {
        this.companyExist = false;
      }
    },
  },
});
