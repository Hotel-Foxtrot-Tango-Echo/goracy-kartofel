export enum RepeaterActivation {
  ACT_CARRIER ='a',
  ACT_1750	='b',
  ACT_CTCSS='c',
  ACT_DCS ='d',
  ACT_DTMF ='e',
  ACT_CC ='f', //DMR Color Code
  ACT_UNKNOWN =	'x',
}

// b.d.	ACT_UNKNOWN	0	0
// nośną	ACT_CARRIER	4	a
// ton 1750Hz	ACT_1750	32	b
// CTCSS	ACT_CTCSS	256	c
// DCS	ACT_DCS	2048	d
// DTMF	ACT_DTMF	16384	e
// b.d.	ACT_UNKNOWN	16777216	0


