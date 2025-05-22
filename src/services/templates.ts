import { StyleSheet } from '@react-pdf/renderer';

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  styles: any;
  isATS: boolean;
}

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and modern design with a focus on readability and ATS compatibility',
    thumbnail: '/templates/modern.png',
    isATS: true,
    styles: StyleSheet.create({
      page: {
        backgroundColor: '#ffffff',
        color: '#2d3748',
        padding: 30,
        fontFamily: 'Helvetica',
      },
      header: {
        marginBottom: 20,
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a202c',
        marginBottom: 8,
      },
      contact: {
        fontSize: 10,
        color: '#4a5568',
        marginBottom: 16,
      },
      section: {
        marginBottom: 16,
      },
      sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 8,
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: 4,
      },
      item: {
        marginBottom: 12,
      },
      itemTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2d3748',
      },
      itemSubtitle: {
        fontSize: 10,
        color: '#4a5568',
        marginBottom: 4,
      },
      itemDescription: {
        fontSize: 10,
        color: '#4a5568',
      },
      skills: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
      },
      skill: {
        fontSize: 10,
        color: '#4a5568',
        backgroundColor: '#edf2f7',
        padding: '4 8',
        borderRadius: 4,
      },
    }),
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Professional and sophisticated design for senior positions',
    thumbnail: '/templates/executive.png',
    isATS: true,
    styles: StyleSheet.create({
      page: {
        backgroundColor: '#ffffff',
        color: '#1a202c',
        padding: 40,
        fontFamily: 'Times-Roman',
      },
      header: {
        marginBottom: 24,
        borderBottom: '2px solid #2d3748',
        paddingBottom: 16,
      },
      name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a202c',
        marginBottom: 8,
      },
      contact: {
        fontSize: 11,
        color: '#4a5568',
        marginBottom: 16,
      },
      section: {
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 12,
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: 6,
      },
      item: {
        marginBottom: 16,
      },
      itemTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#2d3748',
      },
      itemSubtitle: {
        fontSize: 11,
        color: '#4a5568',
        marginBottom: 6,
      },
      itemDescription: {
        fontSize: 11,
        color: '#4a5568',
        lineHeight: 1.4,
      },
      skills: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
      },
      skill: {
        fontSize: 11,
        color: '#4a5568',
        backgroundColor: '#f7fafc',
        padding: '6 12',
        borderRadius: 4,
        border: '1px solid #e2e8f0',
      },
    }),
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Stand out with a unique and creative design',
    thumbnail: '/templates/creative.png',
    isATS: false,
    styles: StyleSheet.create({
      page: {
        backgroundColor: '#ffffff',
        color: '#2d3748',
        padding: 30,
        fontFamily: 'Helvetica',
      },
      header: {
        marginBottom: 24,
        backgroundColor: '#f7fafc',
        padding: 20,
        borderRadius: 8,
      },
      name: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 8,
      },
      contact: {
        fontSize: 10,
        color: '#4a5568',
        marginBottom: 16,
      },
      section: {
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 12,
        borderLeft: '3px solid #4299e1',
        paddingLeft: 8,
      },
      item: {
        marginBottom: 16,
      },
      itemTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2d3748',
      },
      itemSubtitle: {
        fontSize: 10,
        color: '#4a5568',
        marginBottom: 6,
      },
      itemDescription: {
        fontSize: 10,
        color: '#4a5568',
        lineHeight: 1.5,
      },
      skills: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
      },
      skill: {
        fontSize: 10,
        color: '#4a5568',
        backgroundColor: '#ebf8ff',
        padding: '4 10',
        borderRadius: 16,
      },
    }),
  },
]; 