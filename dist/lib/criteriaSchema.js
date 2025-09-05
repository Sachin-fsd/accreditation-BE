"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criterionSchema = void 0;
exports.criterionSchema = {
    "1.1.1": {
        singlecriterion: "1",
        singlecriterionTitle: " Curricular Aspects (150)",
        doublecriterion: "1.1",
        doublecriterionTitle: "Curriculum Design and Development (50)",
        title: "Curricula developed and implemented  have relevance to the local, national, regional and global developmental needs which  is reflected in Programme outcomes (POs), Programme Specific Outcomes(PSOs) and Course Outcomes(COs) of the Programmes offered by the University",
        type: "QlM",
        fields: [
            { name: "description", label: "Description", type: "textarea", maxWords: 500 },
            { name: "file", label: "Upload Additional Information", type: "file" },
            { name: "link", label: "Link for Additional Information", type: "url" }
        ]
    },
    "1.1.2": {
        title: "Syllabus revision",
        description: "Percentage of Programmes where syllabus was revised during the last five years",
        type: "QnM",
        fields: [
            { name: "totalProgrammes", label: "Total Programmes", type: "number" },
            { name: "revisedProgrammes", label: "Programmes Revised", type: "number" },
            { name: "file", label: "Upload Minutes of Meeting", type: "file" }
        ]
    }
    // …extend for all metrics
};
