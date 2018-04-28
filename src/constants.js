export default class Constants  {
  static get BASE_URL() {
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:5000';
    }
    return '';
  }
}
