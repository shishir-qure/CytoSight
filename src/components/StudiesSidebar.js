import React from "react";
import { usePatientReports } from "../components/ReportSidebar/services/usePatientReports";

import ReportItem from "./ReportSidebar/ReportItem";


export default function StudiesSidebar({ patient_uid }) {


  const { reports, loading, error } = usePatientReports({ patient_uid });



  const study = {
    "scan_type": "CT",
    "summary": "Multiple pulmonary nodules identified, including an 8mm nodule in the right upper lobe.",
    "keyslices_dict": [
      {
        "id": 1,
        "label": "8mm nodule in right upper lobe",
        "start_slice": 32,
        "end_slice": 32,
        "key_finding_description": "Series/Image: 4/32 shows an 8mm nodule in the right upper lobe. Recommendation is for follow-up in 3 months.",
        "file_links": [
          "/ouputfolder_ct/slice_917.png"

        ]
      }
    ]
  }
  // const studies = [
  //   {
  //     id: 1,
  //     label: '8mm nodule in right upper lobe',
  //     start_slice: 32,
  //     end_slice: 32,
  //     key_finding_description: 'Series/Image: 4/32 shows an 8mm nodule in the right upper lobe. Recommendation is for follow-up in 3 months.',
  //     file_links: []
  //   }

  //   // {
  //   //   id: 1,
  //   //   // type: "CT Chest",
  //   //   label: '8mm nodule in right upper lobe',
  //   //   // status: "w/o Contrast",
  //   //   // date: "Jun 10, 2025",
  //   //   // time: "15:30",
  //   //   // series: "1",
  //   //   // images: "120",
  //   //   // size: "45.2 MB",
  //   //   // priority: "Critical",
  //   //   // complete: true,
  //   //   // findings: ["New 1.2cm nodule (RUL)", "Bilateral pneumonia", "Mediastinal lymphadenopathy"],
  //   //   // videos: [
  //   //   //   { name: "Nodule (Axial)", icon: "▶️" },
  //   //   //   { name: "Pneumonia", icon: "▶️" },
  //   //   //   { name: "Lymph Nodes", icon: "▶️" },
  //   //   //   { name: "3D Render", icon: "▶️" },
  //   //   // ],
  //   //   // description: "Bilateral lower lobe consolidation. Lung nodule identified in RUL.",
  //   //   // actions: ["View", "Report"],
  //   //   // scans: [
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_001.png",
  //   //   //     "slice_number": 1
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_002.png",
  //   //   //     "slice_number": 2
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_003.png",
  //   //   //     "slice_number": 3
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_004.png",
  //   //   //     "slice_number": 4
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_005.png",
  //   //   //     "slice_number": 5
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_006.png",
  //   //   //     "slice_number": 6
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_007.png",
  //   //   //     "slice_number": 7
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_008.png",
  //   //   //     "slice_number": 8
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_009.png",
  //   //   //     "slice_number": 9
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_010.png",
  //   //   //     "slice_number": 10
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_011.png",
  //   //   //     "slice_number": 11
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_012.png",
  //   //   //     "slice_number": 12
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_013.png",
  //   //   //     "slice_number": 13
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_014.png",
  //   //   //     "slice_number": 14
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_015.png",
  //   //   //     "slice_number": 15
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_016.png",
  //   //   //     "slice_number": 16
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_017.png",
  //   //   //     "slice_number": 17
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_018.png",
  //   //   //     "slice_number": 18
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_019.png",
  //   //   //     "slice_number": 19
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_020.png",
  //   //   //     "slice_number": 20
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_021.png",
  //   //   //     "slice_number": 21
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_022.png",
  //   //   //     "slice_number": 22
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_023.png",
  //   //   //     "slice_number": 23
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_024.png",
  //   //   //     "slice_number": 24
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_025.png",
  //   //   //     "slice_number": 25
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_026.png",
  //   //   //     "slice_number": 26
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_027.png",
  //   //   //     "slice_number": 27
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_028.png",
  //   //   //     "slice_number": 28
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_029.png",
  //   //   //     "slice_number": 29
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_030.png",
  //   //   //     "slice_number": 30
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_031.png",
  //   //   //     "slice_number": 31
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_032.png",
  //   //   //     "slice_number": 32
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_033.png",
  //   //   //     "slice_number": 33
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_034.png",
  //   //   //     "slice_number": 34
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_035.png",
  //   //   //     "slice_number": 35
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_036.png",
  //   //   //     "slice_number": 36
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_037.png",
  //   //   //     "slice_number": 37
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_038.png",
  //   //   //     "slice_number": 38
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_039.png",
  //   //   //     "slice_number": 39
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_040.png",
  //   //   //     "slice_number": 40
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_041.png",
  //   //   //     "slice_number": 41
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_042.png",
  //   //   //     "slice_number": 42
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_043.png",
  //   //   //     "slice_number": 43
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_044.png",
  //   //   //     "slice_number": 44
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_045.png",
  //   //   //     "slice_number": 45
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_046.png",
  //   //   //     "slice_number": 46
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_047.png",
  //   //   //     "slice_number": 47
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_048.png",
  //   //   //     "slice_number": 48
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_049.png",
  //   //   //     "slice_number": 49
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_050.png",
  //   //   //     "slice_number": 50
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_051.png",
  //   //   //     "slice_number": 51
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_052.png",
  //   //   //     "slice_number": 52
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_053.png",
  //   //   //     "slice_number": 53
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_054.png",
  //   //   //     "slice_number": 54
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_055.png",
  //   //   //     "slice_number": 55
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_056.png",
  //   //   //     "slice_number": 56
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_057.png",
  //   //   //     "slice_number": 57
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_058.png",
  //   //   //     "slice_number": 58
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_059.png",
  //   //   //     "slice_number": 59
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_060.png",
  //   //   //     "slice_number": 60
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_061.png",
  //   //   //     "slice_number": 61
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_062.png",
  //   //   //     "slice_number": 62
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_063.png",
  //   //   //     "slice_number": 63
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_064.png",
  //   //   //     "slice_number": 64
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_065.png",
  //   //   //     "slice_number": 65
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_066.png",
  //   //   //     "slice_number": 66
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_067.png",
  //   //   //     "slice_number": 67
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_068.png",
  //   //   //     "slice_number": 68
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_069.png",
  //   //   //     "slice_number": 69
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_070.png",
  //   //   //     "slice_number": 70
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_071.png",
  //   //   //     "slice_number": 71
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_072.png",
  //   //   //     "slice_number": 72
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_073.png",
  //   //   //     "slice_number": 73
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_074.png",
  //   //   //     "slice_number": 74
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_075.png",
  //   //   //     "slice_number": 75
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_076.png",
  //   //   //     "slice_number": 76
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_077.png",
  //   //   //     "slice_number": 77
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_078.png",
  //   //   //     "slice_number": 78
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_079.png",
  //   //   //     "slice_number": 79
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_080.png",
  //   //   //     "slice_number": 80
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_081.png",
  //   //   //     "slice_number": 81
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_082.png",
  //   //   //     "slice_number": 82
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_083.png",
  //   //   //     "slice_number": 83
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_084.png",
  //   //   //     "slice_number": 84
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_085.png",
  //   //   //     "slice_number": 85
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_086.png",
  //   //   //     "slice_number": 86
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_087.png",
  //   //   //     "slice_number": 87
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_088.png",
  //   //   //     "slice_number": 88
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_089.png",
  //   //   //     "slice_number": 89
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_090.png",
  //   //   //     "slice_number": 90
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_091.png",
  //   //   //     "slice_number": 91
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_092.png",
  //   //   //     "slice_number": 92
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_093.png",
  //   //   //     "slice_number": 93
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_094.png",
  //   //   //     "slice_number": 94
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_095.png",
  //   //   //     "slice_number": 95
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_096.png",
  //   //   //     "slice_number": 96
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_097.png",
  //   //   //     "slice_number": 97
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_098.png",
  //   //   //     "slice_number": 98
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_099.png",
  //   //   //     "slice_number": 99
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_100.png",
  //   //   //     "slice_number": 100
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_101.png",
  //   //   //     "slice_number": 101
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_102.png",
  //   //   //     "slice_number": 102
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_103.png",
  //   //   //     "slice_number": 103
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_104.png",
  //   //   //     "slice_number": 104
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_105.png",
  //   //   //     "slice_number": 105
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_106.png",
  //   //   //     "slice_number": 106
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_107.png",
  //   //   //     "slice_number": 107
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_108.png",
  //   //   //     "slice_number": 108
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_109.png",
  //   //   //     "slice_number": 109
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_110.png",
  //   //   //     "slice_number": 110
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_111.png",
  //   //   //     "slice_number": 111
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_112.png",
  //   //   //     "slice_number": 112
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_113.png",
  //   //   //     "slice_number": 113
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_114.png",
  //   //   //     "slice_number": 114
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_115.png",
  //   //   //     "slice_number": 115
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_116.png",
  //   //   //     "slice_number": 116
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_117.png",
  //   //   //     "slice_number": 117
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_118.png",
  //   //   //     "slice_number": 118
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_119.png",
  //   //   //     "slice_number": 119
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_120.png",
  //   //   //     "slice_number": 120
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_121.png",
  //   //   //     "slice_number": 121
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_122.png",
  //   //   //     "slice_number": 122
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_123.png",
  //   //   //     "slice_number": 123
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_124.png",
  //   //   //     "slice_number": 124
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_125.png",
  //   //   //     "slice_number": 125
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_126.png",
  //   //   //     "slice_number": 126
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_127.png",
  //   //   //     "slice_number": 127
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_128.png",
  //   //   //     "slice_number": 128
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_129.png",
  //   //   //     "slice_number": 129
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_130.png",
  //   //   //     "slice_number": 130
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_131.png",
  //   //   //     "slice_number": 131
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_132.png",
  //   //   //     "slice_number": 132
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_133.png",
  //   //   //     "slice_number": 133
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_134.png",
  //   //   //     "slice_number": 134
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_135.png",
  //   //   //     "slice_number": 135
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_136.png",
  //   //   //     "slice_number": 136
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_137.png",
  //   //   //     "slice_number": 137
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_138.png",
  //   //   //     "slice_number": 138
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_139.png",
  //   //   //     "slice_number": 139
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_140.png",
  //   //   //     "slice_number": 140
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_141.png",
  //   //   //     "slice_number": 141
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_142.png",
  //   //   //     "slice_number": 142
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_143.png",
  //   //   //     "slice_number": 143
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_144.png",
  //   //   //     "slice_number": 144
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_145.png",
  //   //   //     "slice_number": 145
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_146.png",
  //   //   //     "slice_number": 146
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_147.png",
  //   //   //     "slice_number": 147
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_148.png",
  //   //   //     "slice_number": 148
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_149.png",
  //   //   //     "slice_number": 149
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_150.png",
  //   //   //     "slice_number": 150
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_151.png",
  //   //   //     "slice_number": 151
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_152.png",
  //   //   //     "slice_number": 152
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_153.png",
  //   //   //     "slice_number": 153
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_154.png",
  //   //   //     "slice_number": 154
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_155.png",
  //   //   //     "slice_number": 155
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_156.png",
  //   //   //     "slice_number": 156
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_157.png",
  //   //   //     "slice_number": 157
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_158.png",
  //   //   //     "slice_number": 158
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_159.png",
  //   //   //     "slice_number": 159
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_160.png",
  //   //   //     "slice_number": 160
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_161.png",
  //   //   //     "slice_number": 161
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_162.png",
  //   //   //     "slice_number": 162
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_163.png",
  //   //   //     "slice_number": 163
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_164.png",
  //   //   //     "slice_number": 164
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_165.png",
  //   //   //     "slice_number": 165
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_166.png",
  //   //   //     "slice_number": 166
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_167.png",
  //   //   //     "slice_number": 167
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_168.png",
  //   //   //     "slice_number": 168
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_169.png",
  //   //   //     "slice_number": 169
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_170.png",
  //   //   //     "slice_number": 170
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_171.png",
  //   //   //     "slice_number": 171
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_172.png",
  //   //   //     "slice_number": 172
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_173.png",
  //   //   //     "slice_number": 173
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_174.png",
  //   //   //     "slice_number": 174
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_175.png",
  //   //   //     "slice_number": 175
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_176.png",
  //   //   //     "slice_number": 176
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_177.png",
  //   //   //     "slice_number": 177
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_178.png",
  //   //   //     "slice_number": 178
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_179.png",
  //   //   //     "slice_number": 179
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_180.png",
  //   //   //     "slice_number": 180
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_181.png",
  //   //   //     "slice_number": 181
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_182.png",
  //   //   //     "slice_number": 182
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_183.png",
  //   //   //     "slice_number": 183
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_184.png",
  //   //   //     "slice_number": 184
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_185.png",
  //   //   //     "slice_number": 185
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_186.png",
  //   //   //     "slice_number": 186
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_187.png",
  //   //   //     "slice_number": 187
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_188.png",
  //   //   //     "slice_number": 188
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_189.png",
  //   //   //     "slice_number": 189
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_190.png",
  //   //   //     "slice_number": 190
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_191.png",
  //   //   //     "slice_number": 191
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_192.png",
  //   //   //     "slice_number": 192
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_193.png",
  //   //   //     "slice_number": 193
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_194.png",
  //   //   //     "slice_number": 194
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_195.png",
  //   //   //     "slice_number": 195
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_196.png",
  //   //   //     "slice_number": 196
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_197.png",
  //   //   //     "slice_number": 197
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_198.png",
  //   //   //     "slice_number": 198
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_199.png",
  //   //   //     "slice_number": 199
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_200.png",
  //   //   //     "slice_number": 200
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_201.png",
  //   //   //     "slice_number": 201
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_202.png",
  //   //   //     "slice_number": 202
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_203.png",
  //   //   //     "slice_number": 203
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_204.png",
  //   //   //     "slice_number": 204
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_205.png",
  //   //   //     "slice_number": 205
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_206.png",
  //   //   //     "slice_number": 206
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_207.png",
  //   //   //     "slice_number": 207
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_208.png",
  //   //   //     "slice_number": 208
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_209.png",
  //   //   //     "slice_number": 209
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_210.png",
  //   //   //     "slice_number": 210
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_211.png",
  //   //   //     "slice_number": 211
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_212.png",
  //   //   //     "slice_number": 212
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_213.png",
  //   //   //     "slice_number": 213
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_214.png",
  //   //   //     "slice_number": 214
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_215.png",
  //   //   //     "slice_number": 215
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_216.png",
  //   //   //     "slice_number": 216
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_217.png",
  //   //   //     "slice_number": 217
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_218.png",
  //   //   //     "slice_number": 218
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_219.png",
  //   //   //     "slice_number": 219
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_220.png",
  //   //   //     "slice_number": 220
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_221.png",
  //   //   //     "slice_number": 221
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_222.png",
  //   //   //     "slice_number": 222
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_223.png",
  //   //   //     "slice_number": 223
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_224.png",
  //   //   //     "slice_number": 224
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_225.png",
  //   //   //     "slice_number": 225
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_226.png",
  //   //   //     "slice_number": 226
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_227.png",
  //   //   //     "slice_number": 227
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_228.png",
  //   //   //     "slice_number": 228
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_229.png",
  //   //   //     "slice_number": 229
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_230.png",
  //   //   //     "slice_number": 230
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_231.png",
  //   //   //     "slice_number": 231
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_232.png",
  //   //   //     "slice_number": 232
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_233.png",
  //   //   //     "slice_number": 233
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_234.png",
  //   //   //     "slice_number": 234
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_235.png",
  //   //   //     "slice_number": 235
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_236.png",
  //   //   //     "slice_number": 236
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_237.png",
  //   //   //     "slice_number": 237
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_238.png",
  //   //   //     "slice_number": 238
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_239.png",
  //   //   //     "slice_number": 239
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_240.png",
  //   //   //     "slice_number": 240
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_241.png",
  //   //   //     "slice_number": 241
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_242.png",
  //   //   //     "slice_number": 242
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_243.png",
  //   //   //     "slice_number": 243
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_244.png",
  //   //   //     "slice_number": 244
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_245.png",
  //   //   //     "slice_number": 245
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_246.png",
  //   //   //     "slice_number": 246
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_247.png",
  //   //   //     "slice_number": 247
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_248.png",
  //   //   //     "slice_number": 248
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_249.png",
  //   //   //     "slice_number": 249
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_250.png",
  //   //   //     "slice_number": 250
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_251.png",
  //   //   //     "slice_number": 251
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_252.png",
  //   //   //     "slice_number": 252
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_253.png",
  //   //   //     "slice_number": 253
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_254.png",
  //   //   //     "slice_number": 254
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_255.png",
  //   //   //     "slice_number": 255
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_256.png",
  //   //   //     "slice_number": 256
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_257.png",
  //   //   //     "slice_number": 257
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_258.png",
  //   //   //     "slice_number": 258
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_259.png",
  //   //   //     "slice_number": 259
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_260.png",
  //   //   //     "slice_number": 260
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_261.png",
  //   //   //     "slice_number": 261
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_262.png",
  //   //   //     "slice_number": 262
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_263.png",
  //   //   //     "slice_number": 263
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_264.png",
  //   //   //     "slice_number": 264
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_265.png",
  //   //   //     "slice_number": 265
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_266.png",
  //   //   //     "slice_number": 266
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_267.png",
  //   //   //     "slice_number": 267
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_268.png",
  //   //   //     "slice_number": 268
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_269.png",
  //   //   //     "slice_number": 269
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_270.png",
  //   //   //     "slice_number": 270
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_271.png",
  //   //   //     "slice_number": 271
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_272.png",
  //   //   //     "slice_number": 272
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_273.png",
  //   //   //     "slice_number": 273
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_274.png",
  //   //   //     "slice_number": 274
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_275.png",
  //   //   //     "slice_number": 275
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_276.png",
  //   //   //     "slice_number": 276
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_277.png",
  //   //   //     "slice_number": 277
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_278.png",
  //   //   //     "slice_number": 278
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_279.png",
  //   //   //     "slice_number": 279
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_280.png",
  //   //   //     "slice_number": 280
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_281.png",
  //   //   //     "slice_number": 281
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_282.png",
  //   //   //     "slice_number": 282
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_283.png",
  //   //   //     "slice_number": 283
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_284.png",
  //   //   //     "slice_number": 284
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_285.png",
  //   //   //     "slice_number": 285
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_286.png",
  //   //   //     "slice_number": 286
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_287.png",
  //   //   //     "slice_number": 287
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_288.png",
  //   //   //     "slice_number": 288
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_289.png",
  //   //   //     "slice_number": 289
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_290.png",
  //   //   //     "slice_number": 290
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_291.png",
  //   //   //     "slice_number": 291
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_292.png",
  //   //   //     "slice_number": 292
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_293.png",
  //   //   //     "slice_number": 293
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_294.png",
  //   //   //     "slice_number": 294
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_295.png",
  //   //   //     "slice_number": 295
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_296.png",
  //   //   //     "slice_number": 296
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_297.png",
  //   //   //     "slice_number": 297
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_298.png",
  //   //   //     "slice_number": 298
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_299.png",
  //   //   //     "slice_number": 299
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_300.png",
  //   //   //     "slice_number": 300
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_301.png",
  //   //   //     "slice_number": 301
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_302.png",
  //   //   //     "slice_number": 302
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_303.png",
  //   //   //     "slice_number": 303
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_304.png",
  //   //   //     "slice_number": 304
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_305.png",
  //   //   //     "slice_number": 305
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_306.png",
  //   //   //     "slice_number": 306
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_307.png",
  //   //   //     "slice_number": 307
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_308.png",
  //   //   //     "slice_number": 308
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_309.png",
  //   //   //     "slice_number": 309
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_310.png",
  //   //   //     "slice_number": 310
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_311.png",
  //   //   //     "slice_number": 311
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_312.png",
  //   //   //     "slice_number": 312
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_313.png",
  //   //   //     "slice_number": 313
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_314.png",
  //   //   //     "slice_number": 314
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_315.png",
  //   //   //     "slice_number": 315
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_316.png",
  //   //   //     "slice_number": 316
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_317.png",
  //   //   //     "slice_number": 317
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_318.png",
  //   //   //     "slice_number": 318
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_319.png",
  //   //   //     "slice_number": 319
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_320.png",
  //   //   //     "slice_number": 320
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_321.png",
  //   //   //     "slice_number": 321
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_322.png",
  //   //   //     "slice_number": 322
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_323.png",
  //   //   //     "slice_number": 323
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_324.png",
  //   //   //     "slice_number": 324
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_325.png",
  //   //   //     "slice_number": 325
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_326.png",
  //   //   //     "slice_number": 326
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_327.png",
  //   //   //     "slice_number": 327
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_328.png",
  //   //   //     "slice_number": 328
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_329.png",
  //   //   //     "slice_number": 329
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_330.png",
  //   //   //     "slice_number": 330
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_331.png",
  //   //   //     "slice_number": 331
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_332.png",
  //   //   //     "slice_number": 332
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_333.png",
  //   //   //     "slice_number": 333
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_334.png",
  //   //   //     "slice_number": 334
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_335.png",
  //   //   //     "slice_number": 335
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_336.png",
  //   //   //     "slice_number": 336
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_337.png",
  //   //   //     "slice_number": 337
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_338.png",
  //   //   //     "slice_number": 338
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_339.png",
  //   //   //     "slice_number": 339
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_340.png",
  //   //   //     "slice_number": 340
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_341.png",
  //   //   //     "slice_number": 341
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_342.png",
  //   //   //     "slice_number": 342
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_343.png",
  //   //   //     "slice_number": 343
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_344.png",
  //   //   //     "slice_number": 344
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_345.png",
  //   //   //     "slice_number": 345
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_346.png",
  //   //   //     "slice_number": 346
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_347.png",
  //   //   //     "slice_number": 347
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_348.png",
  //   //   //     "slice_number": 348
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_349.png",
  //   //   //     "slice_number": 349
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_350.png",
  //   //   //     "slice_number": 350
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_351.png",
  //   //   //     "slice_number": 351
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_352.png",
  //   //   //     "slice_number": 352
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_353.png",
  //   //   //     "slice_number": 353
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_354.png",
  //   //   //     "slice_number": 354
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_355.png",
  //   //   //     "slice_number": 355
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_356.png",
  //   //   //     "slice_number": 356
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_357.png",
  //   //   //     "slice_number": 357
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_358.png",
  //   //   //     "slice_number": 358
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_359.png",
  //   //   //     "slice_number": 359
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_360.png",
  //   //   //     "slice_number": 360
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_361.png",
  //   //   //     "slice_number": 361
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_362.png",
  //   //   //     "slice_number": 362
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_363.png",
  //   //   //     "slice_number": 363
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_364.png",
  //   //   //     "slice_number": 364
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_365.png",
  //   //   //     "slice_number": 365
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_366.png",
  //   //   //     "slice_number": 366
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_367.png",
  //   //   //     "slice_number": 367
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_368.png",
  //   //   //     "slice_number": 368
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_369.png",
  //   //   //     "slice_number": 369
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_370.png",
  //   //   //     "slice_number": 370
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_371.png",
  //   //   //     "slice_number": 371
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_372.png",
  //   //   //     "slice_number": 372
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_373.png",
  //   //   //     "slice_number": 373
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_374.png",
  //   //   //     "slice_number": 374
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_375.png",
  //   //   //     "slice_number": 375
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_376.png",
  //   //   //     "slice_number": 376
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_377.png",
  //   //   //     "slice_number": 377
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_378.png",
  //   //   //     "slice_number": 378
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_379.png",
  //   //   //     "slice_number": 379
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_380.png",
  //   //   //     "slice_number": 380
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_381.png",
  //   //   //     "slice_number": 381
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_382.png",
  //   //   //     "slice_number": 382
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_383.png",
  //   //   //     "slice_number": 383
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_384.png",
  //   //   //     "slice_number": 384
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_385.png",
  //   //   //     "slice_number": 385
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_386.png",
  //   //   //     "slice_number": 386
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_387.png",
  //   //   //     "slice_number": 387
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_388.png",
  //   //   //     "slice_number": 388
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_389.png",
  //   //   //     "slice_number": 389
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_390.png",
  //   //   //     "slice_number": 390
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_391.png",
  //   //   //     "slice_number": 391
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_392.png",
  //   //   //     "slice_number": 392
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_393.png",
  //   //   //     "slice_number": 393
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_394.png",
  //   //   //     "slice_number": 394
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_395.png",
  //   //   //     "slice_number": 395
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_396.png",
  //   //   //     "slice_number": 396
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_397.png",
  //   //   //     "slice_number": 397
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_398.png",
  //   //   //     "slice_number": 398
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_399.png",
  //   //   //     "slice_number": 399
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_400.png",
  //   //   //     "slice_number": 400
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_401.png",
  //   //   //     "slice_number": 401
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_402.png",
  //   //   //     "slice_number": 402
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_403.png",
  //   //   //     "slice_number": 403
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_404.png",
  //   //   //     "slice_number": 404
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_405.png",
  //   //   //     "slice_number": 405
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_406.png",
  //   //   //     "slice_number": 406
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_407.png",
  //   //   //     "slice_number": 407
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_408.png",
  //   //   //     "slice_number": 408
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_409.png",
  //   //   //     "slice_number": 409
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_410.png",
  //   //   //     "slice_number": 410
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_411.png",
  //   //   //     "slice_number": 411
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_412.png",
  //   //   //     "slice_number": 412
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_413.png",
  //   //   //     "slice_number": 413
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_414.png",
  //   //   //     "slice_number": 414
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_415.png",
  //   //   //     "slice_number": 415
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_416.png",
  //   //   //     "slice_number": 416
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_417.png",
  //   //   //     "slice_number": 417
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_418.png",
  //   //   //     "slice_number": 418
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_419.png",
  //   //   //     "slice_number": 419
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_420.png",
  //   //   //     "slice_number": 420
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_421.png",
  //   //   //     "slice_number": 421
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_422.png",
  //   //   //     "slice_number": 422
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_423.png",
  //   //   //     "slice_number": 423
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_424.png",
  //   //   //     "slice_number": 424
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_425.png",
  //   //   //     "slice_number": 425
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_426.png",
  //   //   //     "slice_number": 426
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_427.png",
  //   //   //     "slice_number": 427
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_428.png",
  //   //   //     "slice_number": 428
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_429.png",
  //   //   //     "slice_number": 429
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_430.png",
  //   //   //     "slice_number": 430
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_431.png",
  //   //   //     "slice_number": 431
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_432.png",
  //   //   //     "slice_number": 432
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_433.png",
  //   //   //     "slice_number": 433
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_434.png",
  //   //   //     "slice_number": 434
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_435.png",
  //   //   //     "slice_number": 435
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_436.png",
  //   //   //     "slice_number": 436
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_437.png",
  //   //   //     "slice_number": 437
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_438.png",
  //   //   //     "slice_number": 438
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_439.png",
  //   //   //     "slice_number": 439
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_440.png",
  //   //   //     "slice_number": 440
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_441.png",
  //   //   //     "slice_number": 441
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_442.png",
  //   //   //     "slice_number": 442
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_443.png",
  //   //   //     "slice_number": 443
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_444.png",
  //   //   //     "slice_number": 444
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_445.png",
  //   //   //     "slice_number": 445
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_446.png",
  //   //   //     "slice_number": 446
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_447.png",
  //   //   //     "slice_number": 447
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_448.png",
  //   //   //     "slice_number": 448
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_449.png",
  //   //   //     "slice_number": 449
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_450.png",
  //   //   //     "slice_number": 450
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_451.png",
  //   //   //     "slice_number": 451
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_452.png",
  //   //   //     "slice_number": 452
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_453.png",
  //   //   //     "slice_number": 453
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_454.png",
  //   //   //     "slice_number": 454
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_455.png",
  //   //   //     "slice_number": 455
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_456.png",
  //   //   //     "slice_number": 456
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_457.png",
  //   //   //     "slice_number": 457
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_458.png",
  //   //   //     "slice_number": 458
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_459.png",
  //   //   //     "slice_number": 459
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_460.png",
  //   //   //     "slice_number": 460
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_461.png",
  //   //   //     "slice_number": 461
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_462.png",
  //   //   //     "slice_number": 462
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_463.png",
  //   //   //     "slice_number": 463
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_464.png",
  //   //   //     "slice_number": 464
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_465.png",
  //   //   //     "slice_number": 465
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_466.png",
  //   //   //     "slice_number": 466
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_467.png",
  //   //   //     "slice_number": 467
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_468.png",
  //   //   //     "slice_number": 468
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_469.png",
  //   //   //     "slice_number": 469
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_470.png",
  //   //   //     "slice_number": 470
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_471.png",
  //   //   //     "slice_number": 471
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_472.png",
  //   //   //     "slice_number": 472
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_473.png",
  //   //   //     "slice_number": 473
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_474.png",
  //   //   //     "slice_number": 474
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_475.png",
  //   //   //     "slice_number": 475
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_476.png",
  //   //   //     "slice_number": 476
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_477.png",
  //   //   //     "slice_number": 477
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_478.png",
  //   //   //     "slice_number": 478
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_479.png",
  //   //   //     "slice_number": 479
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_480.png",
  //   //   //     "slice_number": 480
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_481.png",
  //   //   //     "slice_number": 481
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_482.png",
  //   //   //     "slice_number": 482
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_483.png",
  //   //   //     "slice_number": 483
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_484.png",
  //   //   //     "slice_number": 484
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_485.png",
  //   //   //     "slice_number": 485
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_486.png",
  //   //   //     "slice_number": 486
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_487.png",
  //   //   //     "slice_number": 487
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_488.png",
  //   //   //     "slice_number": 488
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_489.png",
  //   //   //     "slice_number": 489
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_490.png",
  //   //   //     "slice_number": 490
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_491.png",
  //   //   //     "slice_number": 491
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_492.png",
  //   //   //     "slice_number": 492
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_493.png",
  //   //   //     "slice_number": 493
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_494.png",
  //   //   //     "slice_number": 494
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_495.png",
  //   //   //     "slice_number": 495
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_496.png",
  //   //   //     "slice_number": 496
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_497.png",
  //   //   //     "slice_number": 497
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_498.png",
  //   //   //     "slice_number": 498
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_499.png",
  //   //   //     "slice_number": 499
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_500.png",
  //   //   //     "slice_number": 500
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_501.png",
  //   //   //     "slice_number": 501
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_502.png",
  //   //   //     "slice_number": 502
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_503.png",
  //   //   //     "slice_number": 503
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_504.png",
  //   //   //     "slice_number": 504
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_505.png",
  //   //   //     "slice_number": 505
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_506.png",
  //   //   //     "slice_number": 506
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_507.png",
  //   //   //     "slice_number": 507
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_508.png",
  //   //   //     "slice_number": 508
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_509.png",
  //   //   //     "slice_number": 509
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_510.png",
  //   //   //     "slice_number": 510
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_511.png",
  //   //   //     "slice_number": 511
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_512.png",
  //   //   //     "slice_number": 512
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_513.png",
  //   //   //     "slice_number": 513
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_514.png",
  //   //   //     "slice_number": 514
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_515.png",
  //   //   //     "slice_number": 515
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_516.png",
  //   //   //     "slice_number": 516
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_517.png",
  //   //   //     "slice_number": 517
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_518.png",
  //   //   //     "slice_number": 518
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_519.png",
  //   //   //     "slice_number": 519
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_520.png",
  //   //   //     "slice_number": 520
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_521.png",
  //   //   //     "slice_number": 521
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_522.png",
  //   //   //     "slice_number": 522
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_523.png",
  //   //   //     "slice_number": 523
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_524.png",
  //   //   //     "slice_number": 524
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_525.png",
  //   //   //     "slice_number": 525
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_526.png",
  //   //   //     "slice_number": 526
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_527.png",
  //   //   //     "slice_number": 527
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_528.png",
  //   //   //     "slice_number": 528
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_529.png",
  //   //   //     "slice_number": 529
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_530.png",
  //   //   //     "slice_number": 530
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_531.png",
  //   //   //     "slice_number": 531
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_532.png",
  //   //   //     "slice_number": 532
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_533.png",
  //   //   //     "slice_number": 533
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_534.png",
  //   //   //     "slice_number": 534
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_535.png",
  //   //   //     "slice_number": 535
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_536.png",
  //   //   //     "slice_number": 536
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_537.png",
  //   //   //     "slice_number": 537
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_538.png",
  //   //   //     "slice_number": 538
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_539.png",
  //   //   //     "slice_number": 539
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_540.png",
  //   //   //     "slice_number": 540
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_541.png",
  //   //   //     "slice_number": 541
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_542.png",
  //   //   //     "slice_number": 542
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_543.png",
  //   //   //     "slice_number": 543
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_544.png",
  //   //   //     "slice_number": 544
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_545.png",
  //   //   //     "slice_number": 545
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_546.png",
  //   //   //     "slice_number": 546
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_547.png",
  //   //   //     "slice_number": 547
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_548.png",
  //   //   //     "slice_number": 548
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_549.png",
  //   //   //     "slice_number": 549
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_550.png",
  //   //   //     "slice_number": 550
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_551.png",
  //   //   //     "slice_number": 551
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_552.png",
  //   //   //     "slice_number": 552
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_553.png",
  //   //   //     "slice_number": 553
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_554.png",
  //   //   //     "slice_number": 554
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_555.png",
  //   //   //     "slice_number": 555
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_556.png",
  //   //   //     "slice_number": 556
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_557.png",
  //   //   //     "slice_number": 557
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_558.png",
  //   //   //     "slice_number": 558
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_559.png",
  //   //   //     "slice_number": 559
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_560.png",
  //   //   //     "slice_number": 560
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_561.png",
  //   //   //     "slice_number": 561
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_562.png",
  //   //   //     "slice_number": 562
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_563.png",
  //   //   //     "slice_number": 563
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_564.png",
  //   //   //     "slice_number": 564
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_565.png",
  //   //   //     "slice_number": 565
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_566.png",
  //   //   //     "slice_number": 566
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_567.png",
  //   //   //     "slice_number": 567
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_568.png",
  //   //   //     "slice_number": 568
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_569.png",
  //   //   //     "slice_number": 569
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_570.png",
  //   //   //     "slice_number": 570
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_571.png",
  //   //   //     "slice_number": 571
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_572.png",
  //   //   //     "slice_number": 572
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_573.png",
  //   //   //     "slice_number": 573
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_574.png",
  //   //   //     "slice_number": 574
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_575.png",
  //   //   //     "slice_number": 575
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_576.png",
  //   //   //     "slice_number": 576
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_577.png",
  //   //   //     "slice_number": 577
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_578.png",
  //   //   //     "slice_number": 578
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_579.png",
  //   //   //     "slice_number": 579
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_580.png",
  //   //   //     "slice_number": 580
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_581.png",
  //   //   //     "slice_number": 581
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_582.png",
  //   //   //     "slice_number": 582
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_583.png",
  //   //   //     "slice_number": 583
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_584.png",
  //   //   //     "slice_number": 584
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_585.png",
  //   //   //     "slice_number": 585
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_586.png",
  //   //   //     "slice_number": 586
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_587.png",
  //   //   //     "slice_number": 587
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_588.png",
  //   //   //     "slice_number": 588
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_589.png",
  //   //   //     "slice_number": 589
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_590.png",
  //   //   //     "slice_number": 590
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_591.png",
  //   //   //     "slice_number": 591
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_592.png",
  //   //   //     "slice_number": 592
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_593.png",
  //   //   //     "slice_number": 593
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_594.png",
  //   //   //     "slice_number": 594
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_595.png",
  //   //   //     "slice_number": 595
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_596.png",
  //   //   //     "slice_number": 596
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_597.png",
  //   //   //     "slice_number": 597
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_598.png",
  //   //   //     "slice_number": 598
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_599.png",
  //   //   //     "slice_number": 599
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_600.png",
  //   //   //     "slice_number": 600
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_601.png",
  //   //   //     "slice_number": 601
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_602.png",
  //   //   //     "slice_number": 602
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_603.png",
  //   //   //     "slice_number": 603
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_604.png",
  //   //   //     "slice_number": 604
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_605.png",
  //   //   //     "slice_number": 605
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_606.png",
  //   //   //     "slice_number": 606
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_607.png",
  //   //   //     "slice_number": 607
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_608.png",
  //   //   //     "slice_number": 608
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_609.png",
  //   //   //     "slice_number": 609
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_610.png",
  //   //   //     "slice_number": 610
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_611.png",
  //   //   //     "slice_number": 611
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_612.png",
  //   //   //     "slice_number": 612
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_613.png",
  //   //   //     "slice_number": 613
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_614.png",
  //   //   //     "slice_number": 614
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_615.png",
  //   //   //     "slice_number": 615
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_616.png",
  //   //   //     "slice_number": 616
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_617.png",
  //   //   //     "slice_number": 617
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_618.png",
  //   //   //     "slice_number": 618
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_619.png",
  //   //   //     "slice_number": 619
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_620.png",
  //   //   //     "slice_number": 620
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_621.png",
  //   //   //     "slice_number": 621
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_622.png",
  //   //   //     "slice_number": 622
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_623.png",
  //   //   //     "slice_number": 623
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_624.png",
  //   //   //     "slice_number": 624
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_625.png",
  //   //   //     "slice_number": 625
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_626.png",
  //   //   //     "slice_number": 626
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_627.png",
  //   //   //     "slice_number": 627
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_628.png",
  //   //   //     "slice_number": 628
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_629.png",
  //   //   //     "slice_number": 629
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_630.png",
  //   //   //     "slice_number": 630
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_631.png",
  //   //   //     "slice_number": 631
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_632.png",
  //   //   //     "slice_number": 632
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_633.png",
  //   //   //     "slice_number": 633
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_634.png",
  //   //   //     "slice_number": 634
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_635.png",
  //   //   //     "slice_number": 635
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_636.png",
  //   //   //     "slice_number": 636
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_637.png",
  //   //   //     "slice_number": 637
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_638.png",
  //   //   //     "slice_number": 638
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_639.png",
  //   //   //     "slice_number": 639
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_640.png",
  //   //   //     "slice_number": 640
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_641.png",
  //   //   //     "slice_number": 641
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_642.png",
  //   //   //     "slice_number": 642
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_643.png",
  //   //   //     "slice_number": 643
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_644.png",
  //   //   //     "slice_number": 644
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_645.png",
  //   //   //     "slice_number": 645
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_646.png",
  //   //   //     "slice_number": 646
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_647.png",
  //   //   //     "slice_number": 647
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_648.png",
  //   //   //     "slice_number": 648
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_649.png",
  //   //   //     "slice_number": 649
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_650.png",
  //   //   //     "slice_number": 650
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_651.png",
  //   //   //     "slice_number": 651
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_652.png",
  //   //   //     "slice_number": 652
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_653.png",
  //   //   //     "slice_number": 653
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_654.png",
  //   //   //     "slice_number": 654
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_655.png",
  //   //   //     "slice_number": 655
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_656.png",
  //   //   //     "slice_number": 656
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_657.png",
  //   //   //     "slice_number": 657
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_658.png",
  //   //   //     "slice_number": 658
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_659.png",
  //   //   //     "slice_number": 659
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_660.png",
  //   //   //     "slice_number": 660
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_661.png",
  //   //   //     "slice_number": 661
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_662.png",
  //   //   //     "slice_number": 662
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_663.png",
  //   //   //     "slice_number": 663
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_664.png",
  //   //   //     "slice_number": 664
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_665.png",
  //   //   //     "slice_number": 665
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_666.png",
  //   //   //     "slice_number": 666
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_667.png",
  //   //   //     "slice_number": 667
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_668.png",
  //   //   //     "slice_number": 668
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_669.png",
  //   //   //     "slice_number": 669
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_670.png",
  //   //   //     "slice_number": 670
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_671.png",
  //   //   //     "slice_number": 671
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_672.png",
  //   //   //     "slice_number": 672
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_673.png",
  //   //   //     "slice_number": 673
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_674.png",
  //   //   //     "slice_number": 674
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_675.png",
  //   //   //     "slice_number": 675
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_676.png",
  //   //   //     "slice_number": 676
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_677.png",
  //   //   //     "slice_number": 677
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_678.png",
  //   //   //     "slice_number": 678
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_679.png",
  //   //   //     "slice_number": 679
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_680.png",
  //   //   //     "slice_number": 680
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_681.png",
  //   //   //     "slice_number": 681
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_682.png",
  //   //   //     "slice_number": 682
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_683.png",
  //   //   //     "slice_number": 683
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_684.png",
  //   //   //     "slice_number": 684
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_685.png",
  //   //   //     "slice_number": 685
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_686.png",
  //   //   //     "slice_number": 686
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_687.png",
  //   //   //     "slice_number": 687
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_688.png",
  //   //   //     "slice_number": 688
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_689.png",
  //   //   //     "slice_number": 689
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_690.png",
  //   //   //     "slice_number": 690
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_691.png",
  //   //   //     "slice_number": 691
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_692.png",
  //   //   //     "slice_number": 692
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_693.png",
  //   //   //     "slice_number": 693
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_694.png",
  //   //   //     "slice_number": 694
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_695.png",
  //   //   //     "slice_number": 695
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_696.png",
  //   //   //     "slice_number": 696
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_697.png",
  //   //   //     "slice_number": 697
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_698.png",
  //   //   //     "slice_number": 698
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_699.png",
  //   //   //     "slice_number": 699
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_700.png",
  //   //   //     "slice_number": 700
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_701.png",
  //   //   //     "slice_number": 701
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_702.png",
  //   //   //     "slice_number": 702
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_703.png",
  //   //   //     "slice_number": 703
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_704.png",
  //   //   //     "slice_number": 704
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_705.png",
  //   //   //     "slice_number": 705
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_706.png",
  //   //   //     "slice_number": 706
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_707.png",
  //   //   //     "slice_number": 707
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_708.png",
  //   //   //     "slice_number": 708
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_709.png",
  //   //   //     "slice_number": 709
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_710.png",
  //   //   //     "slice_number": 710
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_711.png",
  //   //   //     "slice_number": 711
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_712.png",
  //   //   //     "slice_number": 712
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_713.png",
  //   //   //     "slice_number": 713
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_714.png",
  //   //   //     "slice_number": 714
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_715.png",
  //   //   //     "slice_number": 715
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_716.png",
  //   //   //     "slice_number": 716
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_717.png",
  //   //   //     "slice_number": 717
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_718.png",
  //   //   //     "slice_number": 718
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_719.png",
  //   //   //     "slice_number": 719
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_720.png",
  //   //   //     "slice_number": 720
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_721.png",
  //   //   //     "slice_number": 721
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_722.png",
  //   //   //     "slice_number": 722
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_723.png",
  //   //   //     "slice_number": 723
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_724.png",
  //   //   //     "slice_number": 724
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_725.png",
  //   //   //     "slice_number": 725
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_726.png",
  //   //   //     "slice_number": 726
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_727.png",
  //   //   //     "slice_number": 727
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_728.png",
  //   //   //     "slice_number": 728
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_729.png",
  //   //   //     "slice_number": 729
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_730.png",
  //   //   //     "slice_number": 730
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_731.png",
  //   //   //     "slice_number": 731
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_732.png",
  //   //   //     "slice_number": 732
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_733.png",
  //   //   //     "slice_number": 733
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_734.png",
  //   //   //     "slice_number": 734
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_735.png",
  //   //   //     "slice_number": 735
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_736.png",
  //   //   //     "slice_number": 736
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_737.png",
  //   //   //     "slice_number": 737
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_738.png",
  //   //   //     "slice_number": 738
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_739.png",
  //   //   //     "slice_number": 739
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_740.png",
  //   //   //     "slice_number": 740
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_741.png",
  //   //   //     "slice_number": 741
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_742.png",
  //   //   //     "slice_number": 742
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_743.png",
  //   //   //     "slice_number": 743
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_744.png",
  //   //   //     "slice_number": 744
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_745.png",
  //   //   //     "slice_number": 745
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_746.png",
  //   //   //     "slice_number": 746
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_747.png",
  //   //   //     "slice_number": 747
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_748.png",
  //   //   //     "slice_number": 748
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_749.png",
  //   //   //     "slice_number": 749
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_750.png",
  //   //   //     "slice_number": 750
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_751.png",
  //   //   //     "slice_number": 751
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_752.png",
  //   //   //     "slice_number": 752
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_753.png",
  //   //   //     "slice_number": 753
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_754.png",
  //   //   //     "slice_number": 754
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_755.png",
  //   //   //     "slice_number": 755
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_756.png",
  //   //   //     "slice_number": 756
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_757.png",
  //   //   //     "slice_number": 757
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_758.png",
  //   //   //     "slice_number": 758
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_759.png",
  //   //   //     "slice_number": 759
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_760.png",
  //   //   //     "slice_number": 760
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_761.png",
  //   //   //     "slice_number": 761
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_762.png",
  //   //   //     "slice_number": 762
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_763.png",
  //   //   //     "slice_number": 763
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_764.png",
  //   //   //     "slice_number": 764
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_765.png",
  //   //   //     "slice_number": 765
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_766.png",
  //   //   //     "slice_number": 766
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_767.png",
  //   //   //     "slice_number": 767
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_768.png",
  //   //   //     "slice_number": 768
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_769.png",
  //   //   //     "slice_number": 769
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_770.png",
  //   //   //     "slice_number": 770
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_771.png",
  //   //   //     "slice_number": 771
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_772.png",
  //   //   //     "slice_number": 772
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_773.png",
  //   //   //     "slice_number": 773
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_774.png",
  //   //   //     "slice_number": 774
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_775.png",
  //   //   //     "slice_number": 775
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_776.png",
  //   //   //     "slice_number": 776
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_777.png",
  //   //   //     "slice_number": 777
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_778.png",
  //   //   //     "slice_number": 778
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_779.png",
  //   //   //     "slice_number": 779
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_780.png",
  //   //   //     "slice_number": 780
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_781.png",
  //   //   //     "slice_number": 781
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_782.png",
  //   //   //     "slice_number": 782
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_783.png",
  //   //   //     "slice_number": 783
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_784.png",
  //   //   //     "slice_number": 784
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_785.png",
  //   //   //     "slice_number": 785
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_786.png",
  //   //   //     "slice_number": 786
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_787.png",
  //   //   //     "slice_number": 787
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_788.png",
  //   //   //     "slice_number": 788
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_789.png",
  //   //   //     "slice_number": 789
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_790.png",
  //   //   //     "slice_number": 790
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_791.png",
  //   //   //     "slice_number": 791
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_792.png",
  //   //   //     "slice_number": 792
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_793.png",
  //   //   //     "slice_number": 793
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_794.png",
  //   //   //     "slice_number": 794
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_795.png",
  //   //   //     "slice_number": 795
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_796.png",
  //   //   //     "slice_number": 796
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_797.png",
  //   //   //     "slice_number": 797
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_798.png",
  //   //   //     "slice_number": 798
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_799.png",
  //   //   //     "slice_number": 799
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_800.png",
  //   //   //     "slice_number": 800
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_801.png",
  //   //   //     "slice_number": 801
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_802.png",
  //   //   //     "slice_number": 802
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_803.png",
  //   //   //     "slice_number": 803
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_804.png",
  //   //   //     "slice_number": 804
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_805.png",
  //   //   //     "slice_number": 805
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_806.png",
  //   //   //     "slice_number": 806
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_807.png",
  //   //   //     "slice_number": 807
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_808.png",
  //   //   //     "slice_number": 808
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_809.png",
  //   //   //     "slice_number": 809
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_810.png",
  //   //   //     "slice_number": 810
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_811.png",
  //   //   //     "slice_number": 811
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_812.png",
  //   //   //     "slice_number": 812
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_813.png",
  //   //   //     "slice_number": 813
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_814.png",
  //   //   //     "slice_number": 814
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_815.png",
  //   //   //     "slice_number": 815
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_816.png",
  //   //   //     "slice_number": 816
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_817.png",
  //   //   //     "slice_number": 817
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_818.png",
  //   //   //     "slice_number": 818
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_819.png",
  //   //   //     "slice_number": 819
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_820.png",
  //   //   //     "slice_number": 820
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_821.png",
  //   //   //     "slice_number": 821
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_822.png",
  //   //   //     "slice_number": 822
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_823.png",
  //   //   //     "slice_number": 823
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_824.png",
  //   //   //     "slice_number": 824
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_825.png",
  //   //   //     "slice_number": 825
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_826.png",
  //   //   //     "slice_number": 826
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_827.png",
  //   //   //     "slice_number": 827
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_828.png",
  //   //   //     "slice_number": 828
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_829.png",
  //   //   //     "slice_number": 829
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_830.png",
  //   //   //     "slice_number": 830
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_831.png",
  //   //   //     "slice_number": 831
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_832.png",
  //   //   //     "slice_number": 832
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_833.png",
  //   //   //     "slice_number": 833
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_834.png",
  //   //   //     "slice_number": 834
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_835.png",
  //   //   //     "slice_number": 835
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_836.png",
  //   //   //     "slice_number": 836
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_837.png",
  //   //   //     "slice_number": 837
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_838.png",
  //   //   //     "slice_number": 838
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_839.png",
  //   //   //     "slice_number": 839
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_840.png",
  //   //   //     "slice_number": 840
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_841.png",
  //   //   //     "slice_number": 841
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_842.png",
  //   //   //     "slice_number": 842
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_843.png",
  //   //   //     "slice_number": 843
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_844.png",
  //   //   //     "slice_number": 844
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_845.png",
  //   //   //     "slice_number": 845
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_846.png",
  //   //   //     "slice_number": 846
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_847.png",
  //   //   //     "slice_number": 847
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_848.png",
  //   //   //     "slice_number": 848
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_849.png",
  //   //   //     "slice_number": 849
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_850.png",
  //   //   //     "slice_number": 850
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_851.png",
  //   //   //     "slice_number": 851
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_852.png",
  //   //   //     "slice_number": 852
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_853.png",
  //   //   //     "slice_number": 853
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_854.png",
  //   //   //     "slice_number": 854
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_855.png",
  //   //   //     "slice_number": 855
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_856.png",
  //   //   //     "slice_number": 856
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_857.png",
  //   //   //     "slice_number": 857
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_858.png",
  //   //   //     "slice_number": 858
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_859.png",
  //   //   //     "slice_number": 859
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_860.png",
  //   //   //     "slice_number": 860
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_861.png",
  //   //   //     "slice_number": 861
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_862.png",
  //   //   //     "slice_number": 862
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_863.png",
  //   //   //     "slice_number": 863
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_864.png",
  //   //   //     "slice_number": 864
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_865.png",
  //   //   //     "slice_number": 865
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_866.png",
  //   //   //     "slice_number": 866
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_867.png",
  //   //   //     "slice_number": 867
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_868.png",
  //   //   //     "slice_number": 868
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_869.png",
  //   //   //     "slice_number": 869
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_870.png",
  //   //   //     "slice_number": 870
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_871.png",
  //   //   //     "slice_number": 871
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_872.png",
  //   //   //     "slice_number": 872
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_873.png",
  //   //   //     "slice_number": 873
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_874.png",
  //   //   //     "slice_number": 874
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_875.png",
  //   //   //     "slice_number": 875
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_876.png",
  //   //   //     "slice_number": 876
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_877.png",
  //   //   //     "slice_number": 877
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_878.png",
  //   //   //     "slice_number": 878
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_879.png",
  //   //   //     "slice_number": 879
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_880.png",
  //   //   //     "slice_number": 880
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_881.png",
  //   //   //     "slice_number": 881
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_882.png",
  //   //   //     "slice_number": 882
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_883.png",
  //   //   //     "slice_number": 883
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_884.png",
  //   //   //     "slice_number": 884
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_885.png",
  //   //   //     "slice_number": 885
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_886.png",
  //   //   //     "slice_number": 886
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_887.png",
  //   //   //     "slice_number": 887
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_888.png",
  //   //   //     "slice_number": 888
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_889.png",
  //   //   //     "slice_number": 889
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_890.png",
  //   //   //     "slice_number": 890
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_891.png",
  //   //   //     "slice_number": 891
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_892.png",
  //   //   //     "slice_number": 892
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_893.png",
  //   //   //     "slice_number": 893
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_894.png",
  //   //   //     "slice_number": 894
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_895.png",
  //   //   //     "slice_number": 895
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_896.png",
  //   //   //     "slice_number": 896
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_897.png",
  //   //   //     "slice_number": 897
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_898.png",
  //   //   //     "slice_number": 898
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_899.png",
  //   //   //     "slice_number": 899
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_900.png",
  //   //   //     "slice_number": 900
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_901.png",
  //   //   //     "slice_number": 901
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_902.png",
  //   //   //     "slice_number": 902
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_903.png",
  //   //   //     "slice_number": 903
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_904.png",
  //   //   //     "slice_number": 904
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_905.png",
  //   //   //     "slice_number": 905
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_906.png",
  //   //   //     "slice_number": 906
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_907.png",
  //   //   //     "slice_number": 907
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_908.png",
  //   //   //     "slice_number": 908
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_909.png",
  //   //   //     "slice_number": 909
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_910.png",
  //   //   //     "slice_number": 910
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_911.png",
  //   //   //     "slice_number": 911
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_912.png",
  //   //   //     "slice_number": 912
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_913.png",
  //   //   //     "slice_number": 913
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_914.png",
  //   //   //     "slice_number": 914
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_915.png",
  //   //   //     "slice_number": 915
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_916.png",
  //   //   //     "slice_number": 916
  //   //   //   },
  // {
  //   "file_url": "/ouputfolder_ct/slice_917.png",
  //   "slice_number": 917
  // },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_918.png",
  //   //   //     "slice_number": 918
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_919.png",
  //   //   //     "slice_number": 919
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_920.png",
  //   //   //     "slice_number": 920
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_921.png",
  //   //   //     "slice_number": 921
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_922.png",
  //   //   //     "slice_number": 922
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_923.png",
  //   //   //     "slice_number": 923
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_924.png",
  //   //   //     "slice_number": 924
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_925.png",
  //   //   //     "slice_number": 925
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_926.png",
  //   //   //     "slice_number": 926
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_927.png",
  //   //   //     "slice_number": 927
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_928.png",
  //   //   //     "slice_number": 928
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_929.png",
  //   //   //     "slice_number": 929
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_930.png",
  //   //   //     "slice_number": 930
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_931.png",
  //   //   //     "slice_number": 931
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_932.png",
  //   //   //     "slice_number": 932
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_933.png",
  //   //   //     "slice_number": 933
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_934.png",
  //   //   //     "slice_number": 934
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_935.png",
  //   //   //     "slice_number": 935
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_936.png",
  //   //   //     "slice_number": 936
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_937.png",
  //   //   //     "slice_number": 937
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_938.png",
  //   //   //     "slice_number": 938
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_939.png",
  //   //   //     "slice_number": 939
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_940.png",
  //   //   //     "slice_number": 940
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_941.png",
  //   //   //     "slice_number": 941
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_942.png",
  //   //   //     "slice_number": 942
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_943.png",
  //   //   //     "slice_number": 943
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_944.png",
  //   //   //     "slice_number": 944
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_945.png",
  //   //   //     "slice_number": 945
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_946.png",
  //   //   //     "slice_number": 946
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_947.png",
  //   //   //     "slice_number": 947
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_948.png",
  //   //   //     "slice_number": 948
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_949.png",
  //   //   //     "slice_number": 949
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_950.png",
  //   //   //     "slice_number": 950
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_951.png",
  //   //   //     "slice_number": 951
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_952.png",
  //   //   //     "slice_number": 952
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_953.png",
  //   //   //     "slice_number": 953
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_954.png",
  //   //   //     "slice_number": 954
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_955.png",
  //   //   //     "slice_number": 955
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_956.png",
  //   //   //     "slice_number": 956
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_957.png",
  //   //   //     "slice_number": 957
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_958.png",
  //   //   //     "slice_number": 958
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_959.png",
  //   //   //     "slice_number": 959
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_960.png",
  //   //   //     "slice_number": 960
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_961.png",
  //   //   //     "slice_number": 961
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_962.png",
  //   //   //     "slice_number": 962
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_963.png",
  //   //   //     "slice_number": 963
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_964.png",
  //   //   //     "slice_number": 964
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_965.png",
  //   //   //     "slice_number": 965
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_966.png",
  //   //   //     "slice_number": 966
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_967.png",
  //   //   //     "slice_number": 967
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_968.png",
  //   //   //     "slice_number": 968
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_969.png",
  //   //   //     "slice_number": 969
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_970.png",
  //   //   //     "slice_number": 970
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_971.png",
  //   //   //     "slice_number": 971
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_972.png",
  //   //   //     "slice_number": 972
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_973.png",
  //   //   //     "slice_number": 973
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_974.png",
  //   //   //     "slice_number": 974
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_975.png",
  //   //   //     "slice_number": 975
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_976.png",
  //   //   //     "slice_number": 976
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_977.png",
  //   //   //     "slice_number": 977
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_978.png",
  //   //   //     "slice_number": 978
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_979.png",
  //   //   //     "slice_number": 979
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_980.png",
  //   //   //     "slice_number": 980
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_981.png",
  //   //   //     "slice_number": 981
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_982.png",
  //   //   //     "slice_number": 982
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_983.png",
  //   //   //     "slice_number": 983
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_984.png",
  //   //   //     "slice_number": 984
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_985.png",
  //   //   //     "slice_number": 985
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_986.png",
  //   //   //     "slice_number": 986
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_987.png",
  //   //   //     "slice_number": 987
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_988.png",
  //   //   //     "slice_number": 988
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_989.png",
  //   //   //     "slice_number": 989
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_990.png",
  //   //   //     "slice_number": 990
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_991.png",
  //   //   //     "slice_number": 991
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_992.png",
  //   //   //     "slice_number": 992
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_993.png",
  //   //   //     "slice_number": 993
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_994.png",
  //   //   //     "slice_number": 994
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_995.png",
  //   //   //     "slice_number": 995
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_996.png",
  //   //   //     "slice_number": 996
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_997.png",
  //   //   //     "slice_number": 997
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_998.png",
  //   //   //     "slice_number": 998
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_999.png",
  //   //   //     "slice_number": 999
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1000.png",
  //   //   //     "slice_number": 1000
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1001.png",
  //   //   //     "slice_number": 1001
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1002.png",
  //   //   //     "slice_number": 1002
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1003.png",
  //   //   //     "slice_number": 1003
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1004.png",
  //   //   //     "slice_number": 1004
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1005.png",
  //   //   //     "slice_number": 1005
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1006.png",
  //   //   //     "slice_number": 1006
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1007.png",
  //   //   //     "slice_number": 1007
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1008.png",
  //   //   //     "slice_number": 1008
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1009.png",
  //   //   //     "slice_number": 1009
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1010.png",
  //   //   //     "slice_number": 1010
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1011.png",
  //   //   //     "slice_number": 1011
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1012.png",
  //   //   //     "slice_number": 1012
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1013.png",
  //   //   //     "slice_number": 1013
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1014.png",
  //   //   //     "slice_number": 1014
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1015.png",
  //   //   //     "slice_number": 1015
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1016.png",
  //   //   //     "slice_number": 1016
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1017.png",
  //   //   //     "slice_number": 1017
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1018.png",
  //   //   //     "slice_number": 1018
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1019.png",
  //   //   //     "slice_number": 1019
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1020.png",
  //   //   //     "slice_number": 1020
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1021.png",
  //   //   //     "slice_number": 1021
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1022.png",
  //   //   //     "slice_number": 1022
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1023.png",
  //   //   //     "slice_number": 1023
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1024.png",
  //   //   //     "slice_number": 1024
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1025.png",
  //   //   //     "slice_number": 1025
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1026.png",
  //   //   //     "slice_number": 1026
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1027.png",
  //   //   //     "slice_number": 1027
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1028.png",
  //   //   //     "slice_number": 1028
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1029.png",
  //   //   //     "slice_number": 1029
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1030.png",
  //   //   //     "slice_number": 1030
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1031.png",
  //   //   //     "slice_number": 1031
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1032.png",
  //   //   //     "slice_number": 1032
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1033.png",
  //   //   //     "slice_number": 1033
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1034.png",
  //   //   //     "slice_number": 1034
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1035.png",
  //   //   //     "slice_number": 1035
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1036.png",
  //   //   //     "slice_number": 1036
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1037.png",
  //   //   //     "slice_number": 1037
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1038.png",
  //   //   //     "slice_number": 1038
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1039.png",
  //   //   //     "slice_number": 1039
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1040.png",
  //   //   //     "slice_number": 1040
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1041.png",
  //   //   //     "slice_number": 1041
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1042.png",
  //   //   //     "slice_number": 1042
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1043.png",
  //   //   //     "slice_number": 1043
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1044.png",
  //   //   //     "slice_number": 1044
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1045.png",
  //   //   //     "slice_number": 1045
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1046.png",
  //   //   //     "slice_number": 1046
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1047.png",
  //   //   //     "slice_number": 1047
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1048.png",
  //   //   //     "slice_number": 1048
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1049.png",
  //   //   //     "slice_number": 1049
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1050.png",
  //   //   //     "slice_number": 1050
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1051.png",
  //   //   //     "slice_number": 1051
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1052.png",
  //   //   //     "slice_number": 1052
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1053.png",
  //   //   //     "slice_number": 1053
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1054.png",
  //   //   //     "slice_number": 1054
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1055.png",
  //   //   //     "slice_number": 1055
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1056.png",
  //   //   //     "slice_number": 1056
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1057.png",
  //   //   //     "slice_number": 1057
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1058.png",
  //   //   //     "slice_number": 1058
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1059.png",
  //   //   //     "slice_number": 1059
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1060.png",
  //   //   //     "slice_number": 1060
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1061.png",
  //   //   //     "slice_number": 1061
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1062.png",
  //   //   //     "slice_number": 1062
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1063.png",
  //   //   //     "slice_number": 1063
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1064.png",
  //   //   //     "slice_number": 1064
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1065.png",
  //   //   //     "slice_number": 1065
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1066.png",
  //   //   //     "slice_number": 1066
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1067.png",
  //   //   //     "slice_number": 1067
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1068.png",
  //   //   //     "slice_number": 1068
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1069.png",
  //   //   //     "slice_number": 1069
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1070.png",
  //   //   //     "slice_number": 1070
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1071.png",
  //   //   //     "slice_number": 1071
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1072.png",
  //   //   //     "slice_number": 1072
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1073.png",
  //   //   //     "slice_number": 1073
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1074.png",
  //   //   //     "slice_number": 1074
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1075.png",
  //   //   //     "slice_number": 1075
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1076.png",
  //   //   //     "slice_number": 1076
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1077.png",
  //   //   //     "slice_number": 1077
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1078.png",
  //   //   //     "slice_number": 1078
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1079.png",
  //   //   //     "slice_number": 1079
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1080.png",
  //   //   //     "slice_number": 1080
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1081.png",
  //   //   //     "slice_number": 1081
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1082.png",
  //   //   //     "slice_number": 1082
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1083.png",
  //   //   //     "slice_number": 1083
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1084.png",
  //   //   //     "slice_number": 1084
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1085.png",
  //   //   //     "slice_number": 1085
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1086.png",
  //   //   //     "slice_number": 1086
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1087.png",
  //   //   //     "slice_number": 1087
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1088.png",
  //   //   //     "slice_number": 1088
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1089.png",
  //   //   //     "slice_number": 1089
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1090.png",
  //   //   //     "slice_number": 1090
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1091.png",
  //   //   //     "slice_number": 1091
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1092.png",
  //   //   //     "slice_number": 1092
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1093.png",
  //   //   //     "slice_number": 1093
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1094.png",
  //   //   //     "slice_number": 1094
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1095.png",
  //   //   //     "slice_number": 1095
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1096.png",
  //   //   //     "slice_number": 1096
  //   //   //   },
  //   //   //   {
  //   //   //     "file_url": "/ouputfolder_ct/slice_1097.png",
  //   //   //     "slice_number": 1097
  //   //   //   }
  //   //   // ],
  //   //   // keySlices: [
  //   //   //   {
  //   //   //     id: 1,
  //   //   //     startSlice: 10,
  //   //   //     endSlice: 15,
  //   //   //     label: "Axial view showing left ventricle",
  //   //   //   },
  //   //   //   {
  //   //   //     startSlice: 25,
  //   //   //     endSlice: 30,
  //   //   //     label: "Coronal view showing aortic valve",
  //   //   //   },
  //   //   //   {
  //   //   //     startSlice: 40,
  //   //   //     endSlice: 45,
  //   //   //     label: "Sagittal view showing right ventricle",
  //   //   //   },
  //   //   // ],
  //   // },
  //   // {
  //   //   id: 2,
  //   //   type: "CT Chest",
  //   //   status: "(Prior)",
  //   //   date: "May 15, 2025",
  //   //   time: "14:20",
  //   //   series: "1",
  //   //   images: "115",
  //   //   size: "42.8 MB",
  //   //   priority: "Baseline",
  //   //   complete: true,
  //   //   comparison: ["No nodule present (NEW finding on current study)", "Lungs clear bilaterally", "Normal mediastinum"],
  //   //   slices: [
  //   //     { name: "RUL Normal", icon: "▶️" },
  //   //     { name: "Clear Lungs", icon: "▶️" },
  //   //   ],
  //   //   description: "Comparison study. Stable pulmonary nodules. No acute findings.",
  //   //   actions: ["View", "Report"],

  //   //   scans: [
  //   //     {
  //   //       "file_url": "/ouputfolder_ct/slice_001.png",
  //   //       "slice_number": 1
  //   //     },
  //   //     {
  //   //       "file_url": "/ouputfolder_ct/slice_002.png",
  //   //       "slice_number": 2
  //   //     },
  //   //     {
  //   //       "file_url": "/ouputfolder_ct/slice_003.png",
  //   //       "slice_number": 3
  //   //     },
  //   //     {
  //   //       "file_url": "/ouputfolder_ct/slice_004.png",
  //   //       "slice_number": 4
  //   //     },
  //   //     {
  //   //       "file_url": "/ouputfolder_ct/slice_005.png",
  //   //       "slice_number": 5
  //   //     }
  //   //   ],
  //   //   keySlices: [
  //   //     {
  //   //       "id": "2",
  //   //       "label": "left ventricle",
  //   //       "startSlice": 10,
  //   //       "endSlice": 15,
  //   //       "keyFindingDescription": "Axial view showing left ventricle"
  //   //     },
  //   //     {
  //   //       "id": "2",
  //   //       "label": "aortic valve",
  //   //       "startSlice": 25,
  //   //       "endSlice": 30,
  //   //       "keyFindingDescription": "Coronal view showing aortic valve"
  //   //     },
  //   //     {
  //   //       "id": "2",
  //   //       "label": "right ventricle",
  //   //       "startSlice": 40,
  //   //       "endSlice": 45,
  //   //       "keyFindingDescription": "Sagittal view showing right ventricle"
  //   //     },
  //   //     {
  //   //       "id": "1",
  //   //       "label": "New 1.2cm nodule in Right Upper Lobe (RUL)",
  //   //       "startSlice": 10,
  //   //       "endSlice": 15,
  //   //       "keyFindingDescription": "A new nodule was detected in the right upper lobe (RUL) of the lung, measuring 1.2cm."
  //   //     },
  //   //     {
  //   //       "id": "1",
  //   //       "label": "Bilateral pneumonia",
  //   //       "startSlice": 25,
  //   //       "endSlice": 30,
  //   //       "keyFindingDescription": "Bilateral lower lobe consolidation consistent with pneumonia."
  //   //     },
  //   //     {
  //   //       "id": "1",
  //   //       "label": "Mediastinal lymphadenopathy",
  //   //       "startSlice": 40,
  //   //       "endSlice": 45,
  //   //       "keyFindingDescription": "Enlarged lymph nodes in the mediastinum."
  //   //     }
  //   //   ]
  //   // },
  //   // {
  //   //   id: 3,
  //   //   type: "Chest X-ray (2 Views)",
  //   //   date: "Jun 10, 2025",
  //   //   time: "09:45",
  //   //   series: "2",
  //   //   images: "2",
  //   //   size: "8.4 MB",
  //   //   priority: "Abnormal",
  //   //   complete: true,
  //   //   aiAnalysis: [
  //   //     "Bilateral lower lobe infiltrates",
  //   //     "Possible pleural effusion (L)",
  //   //     "Heart size within normal limits",
  //   //   ],
  //   //   keyImages: [
  //   //     { name: "PA View", icon: "👁️" },
  //   //     { name: "Lateral View", icon: "👁️" },
  //   //   ],
  //   //   description: "PA and Lateral views. Bilateral infiltrates noted.",
  //   //   actions: ["View", "Report"],
  //   // },
  //   // {
  //   //   id: 4,
  //   //   type: "Echocardiogram",
  //   //   date: "Jun 9, 2025",
  //   //   time: "11:30",
  //   //   series: "1",
  //   //   images: "45",
  //   //   size: "125.6 MB",
  //   //   priority: "Normal",
  //   //   complete: true,
  //   //   aiAnalysis: [
  //   //     "Normal left ventricular function (EF 60%)",
  //   //     "No wall motion abnormalities",
  //   //     "Mild mitral regurgitation",
  //   //   ],
  //   //   keyImages: [
  //   //     { name: "Parasternal Long", icon: "▶️" },
  //   //     { name: "Apical 4-Chamber", icon: "▶️" },
  //   //   ],
  //   //   description: "Transthoracic echocardiogram. Normal cardiac function.",
  //   //   actions: ["View", "Report"],
  //   // },
  // ]


  // const reportKeySlices = useStoreState(Store, (state) => state.reportKeySlices);
  // const [_reportKeySlices, setReportKeySlices] = useState([]);
  // useEffect(() => {
  //   setReportKeySlices(reportKeySlices);
  // }, [reportKeySlices])
  // // useStoreState(Store, (state) => state.reportKeySlices);
  // console.log({ reportKeySlices })


  // const handleKeyImageClick = (study) => {
  //   // Create a mock report object based on the study data
  //   console.log({ study })
  //   const mockReport = {
  //     id: study.id,
  //     report: study.description,
  //     report_type: study.type,
  //     report_date: study.date,
  //     scans: study.keyImages?.map((img, index) => ({
  //       slice_number: index + 1,
  //       image_url: img.name
  //     }))
  //   };
  //   setSelectedReport(mockReport);
  //   setIsModalOpen(true);
  // };

  // const [isKeySummaryLoaded, setIsKeySummaryLoaded] = useState(false);

  return (
    <div className="w-96 bg-gray-800 border-l border-gray-700 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Patient Studies</h2>
        <p className="text-sm text-gray-400">Auto-retrieved via PACS connection</p>
      </div>



      <div className="p-4 space-y-6">
        <div key={study.id} className="bg-gray-700 rounded-lg p-4">

          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3 justify-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                {study.scan_type.includes("CT") && <span className="text-white text-sm">📊</span>}
                {study.scan_type.includes("X-ray") && <span className="text-white text-sm">📷</span>}
                {study.scan_type.includes("Echo") && <span className="text-white text-sm">❤️</span>}
              </div>
              <div>
                <div className="font-semibold text-white uppercase text-2xl">{study.scan_type} </div>

              </div>
            </div>

          </div>

          <div className="bg-red-900 rounded-lg p-3 mb-4">
            <div className="text-red-300 font-semibold text-sm mb-2">🤖 AI Key Findings:</div>
            <ul className="text-xs text-red-200 space-y-1">
              {study?.summary}
            </ul>
          </div>

          <div className="mb-4">
            <div className="text-sm font-semibold mb-2 text-gray-300">🎬 Key Slice Videos (AI Generated):</div>
            <div className="">

              <ReportItem
                key={study.id}
                report={study}
                keySlices={study?.keyslices_dict}
              // executeTask={executeTask}
              />
            </div>
          </div>


        </div>

      </div>
    </div>
  )
}
