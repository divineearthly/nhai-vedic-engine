#include <opencv2/opencv.hpp>

bool detectBlink(
    double leftEAR,
    double rightEAR)
{
    double avg=(leftEAR+rightEAR)/2.0;

    return avg < 0.21;
}

bool detectHeadTurn(
    double yaw)
{
    return fabs(yaw) > 10.0;
}

bool verifyLiveness(
    double leftEAR,
    double rightEAR,
    double yaw)
{
    bool blink=detectBlink(leftEAR,rightEAR);
    bool turn=detectHeadTurn(yaw);

    return blink && turn;
}
