export enum regexTitle {
  eng = `მხოლოდ ინგლისური ასოები`,
  geo = `მხოლოდ ქართული ასოები`,
  num = `მხოლოდ ციფრები`,
  engGeo = 'მხოლოდ ქართული და ინგლისური ასოები',
  engNum = 'მხოლოდ ინგლისური ასოები და ციფრები',
  geoNum = 'მხოლოდ ქართული ასოები და ციფრები'
}

export const regexTemplate = {
  eng: /^[a-zA-Z\s]+$]*$/im,
  geo: /^[ა-ჰ\s]*$/im,
  num: /[0-9]*/im,
  engGeo: /^[a-zA-Zა-ჰ\s]*$/im,
  engNum: /^[a-zA-Z0-9\s]*$/im,
  geoNum: /^[ა-ჰ0-9\s]*$/im
};

export const EMAIL_REGEXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
