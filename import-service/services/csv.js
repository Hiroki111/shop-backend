import csvParser from 'csv-parser';

export function parseCsvStream(stream) {
  return new Promise((resolve, reject) => {
    const data = [];
    stream
      .pipe(csvParser())
      .on('data', (record) => {
        data.push(record);
      })
      .on('error', reject)
      .on('end', () => {
        resolve(data);
      });
  });
}
