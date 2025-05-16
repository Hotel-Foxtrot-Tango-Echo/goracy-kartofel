export enum RepeaterStatus {
  PLANNED = '1',
  BUILDING = '2',
  TESTING = '3',
  WORKING = '4',
  UNKNOWN = '5',
  DISABLED = '6'
}

// WORKING = '1',		1	 - 	4
// DISABLED = '2',		2	 - 	6
// UNKNOWN = '4',		4	 - 	5
// TESTING = '8',		8	 - 	3
// BUILDING = '16',		16	 - 	2
// PLANNED = '32'		32	 - 	1



