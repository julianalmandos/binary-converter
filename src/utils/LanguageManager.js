export default class LanguageManager {

  static getLanguages() {
    return [
      'en_US',
      'es_ES'
    ];
  }

  static savePrefLanguage(language) {
    localStorage.setItem('lang', language);
  }

  static getCurrentLanguage() {
    return localStorage.getItem('lang') || 'es_ES';
  }

  static isValid(language) {
    return LanguageManager.getLanguages().includes(language);
  }
}
