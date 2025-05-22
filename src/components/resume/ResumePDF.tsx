import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottom: '1 solid #ccc',
    paddingBottom: 3,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.4,
    marginBottom: 10,
  },
  experience: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 11,
    color: '#666',
    marginBottom: 3,
  },
  responsibilities: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
  education: {
    fontSize: 11,
    marginBottom: 5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f0f0f0',
    padding: '3 8',
    borderRadius: 3,
  },
  projects: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 10,
    marginBottom: 5,
  },
});

interface ResumePDFProps {
  data: ResumeData;
}

const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => (
  <PDFViewer style={{ width: '100%', height: '100vh' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.contact.name}</Text>
          <Text style={styles.contact}>{data.contact.email}</Text>
          <Text style={styles.contact}>{data.contact.phone}</Text>
          <Text style={styles.contact}>{data.contact.location}</Text>
          {data.contact.linkedin && (
            <Text style={styles.contact}>LinkedIn: {data.contact.linkedin}</Text>
          )}
          {data.contact.website && (
            <Text style={styles.contact}>Website: {data.contact.website}</Text>
          )}
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experience}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.company}>
                  {exp.company} • {exp.duration}
                </Text>
                {exp.description.split('\n').map((line, i) => (
                  <Text key={i} style={styles.responsibilities}>
                    • {line}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index}>
                <Text style={styles.education}>
                  {edu.degree} - {edu.school} • {edu.year}
                </Text>
                {edu.description && (
                  <Text style={styles.responsibilities}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skills}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.projects}>
                <Text style={styles.projectTitle}>{project.name}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                {project.technologies.length > 0 && (
                  <View style={styles.skills}>
                    {project.technologies.map((tech, techIndex) => (
                      <Text key={techIndex} style={styles.skill}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, index) => (
              <Text key={index} style={styles.education}>
                • {cert}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  </PDFViewer>
);

export default ResumePDF; 