import { act } from '@testing-library/react';
import useSystemNotificationSender from '../../src/hooks/useSystemNotificationSender';
import {TranscriptData} from "../../src/types";

class MockNotification {
    get options(): NotificationOptions | undefined {
        return this._options;
    }
    get title(): string {
        return this._title;
    }
    static get instance(): MockNotification {
        return this._instance;
    }
    static permission: NotificationPermission = 'default';

    static requestPermission = jest.fn().mockResolvedValue('granted');
    private static _instance: MockNotification;
    private readonly _title: string;
    private readonly _options: NotificationOptions|undefined;

    constructor(title: string, options?: NotificationOptions) {
        this._title = title;
        this._options = options;
        MockNotification._instance = this;
    }
}

globalThis.Notification = MockNotification as any;

describe('useSystemNotificationSender', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('requestPermission should call Notification.requestPermission', async () => {
        const { requestPermission } = useSystemNotificationSender();

        await act(async () => {
            await requestPermission();
        });

        expect(MockNotification.requestPermission).toHaveBeenCalled();
    });

    test('sendSystemNotification should show notification if permission is granted', async () => {
        const { sendSystemNotification } = useSystemNotificationSender();

        MockNotification.permission = 'granted';


        const mockTranscription: TranscriptData = {
            uid: 1,
            name: '1',
            status: 'Success',
            start_date: '2023-04-21 13:45:00',
            duration: '3 min',
        };

        await act(async () => {
            await sendSystemNotification(mockTranscription);
        });

        expect(MockNotification.instance.title).toEqual('Transcript 1 updated');
        expect(MockNotification.instance.options).toEqual({
            body: 'Status: Success',
            lang: 'en',
        });
    });

    test('sendSystemNotification should show alert if permission is not granted', async () => {
        const { sendSystemNotification } = useSystemNotificationSender();

        MockNotification.permission = 'denied';

        globalThis.alert = jest.fn();

        const mockTranscription: TranscriptData = {
            uid: 1,
            name: '1',
            status: 'Success',
            start_date: '2023-04-21 13:45:00',
            duration: '3 min',
        };

        await act(async () => {
            await sendSystemNotification(mockTranscription);
        });

        expect(globalThis.alert).toHaveBeenCalledWith(
            'Transcript 1 Status updated: Success.\n\n Please enable notifications in your browser settings.'
        );
    });
});
