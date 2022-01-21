import { LinkTarget } from '../types';

export function scrollToAnchor(location: string, wait: number): void {
  const element = document.querySelector('#' + location);
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }, wait);
  }
}

// doesn't allow to scroll by space key
function onSpaceBarPress(e: KeyboardEvent): void {
  if (e.keyCode === 32 && e.target === document.body) {
    e.preventDefault();
  }
}

export function disableScrollOnSpaceBar(): void {
  window.addEventListener('keydown', onSpaceBarPress);
}

export function removeDisableScrollOnSpaceBar() {
  window.removeEventListener('keydown', onSpaceBarPress);
}

export function scrollWindowTo(offsetTop: number): void {
  setTimeout(() => window.scrollTo(0, offsetTop));
}

export function openInNewWindow(
  url: string,
  width: number = 800,
  height: number = 600
) {
  window.open(url, '', `width=${width},height=${height}`);
}

export function openLink(url: string, target: LinkTarget) {
  window.open(url, target).focus();
}

export function reload() {
  window.location.reload();
  setTimeout(() => scrollWindowTo(0), 0);
}
