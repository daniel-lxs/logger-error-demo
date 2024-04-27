import { Logger } from '@control.systems/logger';
import { JSDOM } from 'jsdom';

// Define the interface for the response data
interface ResponseData {
  title: string;
  url: string;
}

// Create a logger instance
const logger = new Logger('Website Fetcher');

// Function to fetch data from a website
async function fetchWebsiteData(url: string): Promise<ResponseData> {
  try {
    const response = await fetch(url);
    const html = await response.text();

    // Parse the HTML to extract the title and URL
    const dom = new JSDOM(html);
    const title =
      dom.window.document.querySelector('title')?.textContent ||
      'No title found';
    const pageUrl = response.url;

    return { title, url: pageUrl };
  } catch (error) {
    logger.error('Error fetching website data:', error);
    throw error;
  }
}

// Example usage
async function main() {
  const websites = [
    'https://www.example.com',
    'https://www.google.com',
    'https://www.anthropic.com',
    'https://www.this-website-does-not-exist.xyz',
  ];

  for (const website of websites) {
    try {
      const data = await fetchWebsiteData(website);
      logger.info(`Website: ${data.url}`);
      logger.info(`Title: ${data.title}`);
      logger.info('---');
    } catch (error) {
      logger.error(`Error fetching data for ${website}:`, error);
    }
  }
}

main();
