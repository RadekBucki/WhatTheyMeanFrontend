# Hooks

In src/hooks directory you can find custom hooks used in the application.

## useAnalyseDataSaver

This hook uses jspdf library to save data from analyse page as pdf file. The jsPDF object
allows to add text and images to the pdf file.
```ts
const pdf = new jsPDF();
pdf.setFillColor('#151E3F');
pdf.setTextColor('#FFFFFF');
pdf.rect(0, 0, 210, 297, 'F');
pdf.addImage('/src/assets/WTM_Logo-2.png', 'PNG', 10, 10, 190, 125);
pdf.text(pdfContent, 10, 150);
```

To save the pdf file, the hook creates a link element and sets its href attribute to the base64
representation of the pdf file. Then it sets the download attribute to the name of the file and
triggers a click event on the link element.
```ts
const fileChooser = document.createElement('a');
fileChooser.href = 'data:application/pdf;base64,' + btoa(pdf.output());
fileChooser.download = 'analyse.pdf';
fileChooser.click();
```

## useSentimentIdsRepository

This hook uses local storage to save and retrieve sentiment ids. It uses the `useEffect` hook to
save the ids to local storage every time the ids change and the `useState` hook to retrieve the
ids from local storage on the first render.

## useSystemNotificationSender

This hook is an adapter for the `Notification` object. It exposes 2 methods to at first request for
permission to send notifications and next to send notifications.
